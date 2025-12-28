-- ============================================
-- GUDDU-PROJECT: PostgreSQL Database Schema
-- Enterprise Social Media Marketing Platform
-- Version: 1.0.0
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ORGANIZATIONS & USERS
-- ============================================

-- Organizations (Multi-tenant)
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website VARCHAR(500),
    country_code VARCHAR(3),
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Settings
    settings JSONB DEFAULT '{}',
    brand_guidelines JSONB DEFAULT '{}',
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'inactive')),
    subscription_tier VARCHAR(20) DEFAULT 'enterprise' CHECK (subscription_tier IN ('trial', 'pro', 'enterprise', 'government')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_status ON organizations(status);

-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Identity
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255), -- bcrypt hashed
    
    -- Profile
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    title VARCHAR(100),
    department VARCHAR(100),
    
    -- Role-Based Access Control
    role VARCHAR(50) NOT NULL CHECK (role IN (
        'super_admin', 'org_admin', 'strategy_lead', 'content_creator',
        'event_ops', 'social_manager', 'analytics_specialist', 'delegate_viewer',
        'approval_manager', 'vendor'
    )),
    permissions JSONB DEFAULT '[]',
    
    -- OAuth
    oauth_provider VARCHAR(50),
    oauth_id VARCHAR(255),
    
    -- Preferences
    preferences JSONB DEFAULT '{}',
    notification_settings JSONB DEFAULT '{}',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    last_login_ip INET,
    
    -- Security
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Refresh Tokens
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);

-- ============================================
-- EVENTS & CAMPAIGNS
-- ============================================

-- Events (e.g., CSPOC 2026)
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    tagline VARCHAR(500),
    
    -- Dates
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    -- Location
    location JSONB, -- {venue, city, country, coordinates}
    
    -- Branding
    logo_url VARCHAR(500),
    banner_url VARCHAR(500),
    theme_colors JSONB,
    
    -- Social Media Handles
    social_handles JSONB DEFAULT '{}', -- {facebook, twitter, instagram, youtube, linkedin}
    official_hashtags TEXT[],
    
    -- Settings
    settings JSONB DEFAULT '{}',
    
    -- Status
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'pre_event', 'live', 'post_event', 'archived')),
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE UNIQUE INDEX idx_events_slug_org ON events(organization_id, slug);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_dates ON events(start_date, end_date);

-- Event Phases (Pre-event, During, Post-event)
CREATE TABLE event_phases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    description TEXT,
    phase_type VARCHAR(20) NOT NULL CHECK (phase_type IN ('pre_event', 'live', 'post_event')),
    
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    goals JSONB DEFAULT '[]',
    kpis JSONB DEFAULT '[]',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_phases_event ON event_phases(event_id);

-- Delegates (VIPs, Speakers, Participants)
CREATE TABLE delegates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    
    -- Personal Info
    title VARCHAR(50), -- Hon., Dr., Prof., etc.
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) GENERATED ALWAYS AS (COALESCE(title || ' ', '') || first_name || ' ' || last_name) STORED,
    
    designation VARCHAR(255),
    organization_name VARCHAR(255),
    country VARCHAR(100),
    
    -- Contact
    email VARCHAR(255),
    phone VARCHAR(20),
    
    -- Photo
    photo_url VARCHAR(500),
    
    -- Social Media Handles
    social_handles JSONB DEFAULT '{}',
    
    -- Categorization
    delegate_type VARCHAR(50) CHECK (delegate_type IN ('speaker', 'vip', 'participant', 'media', 'organizer')),
    vip_tier INT DEFAULT 3 CHECK (vip_tier BETWEEN 1 AND 5), -- 1 = highest
    
    -- Preferences
    auto_tag BOOLEAN DEFAULT false, -- Auto-tag in posts
    requires_approval BOOLEAN DEFAULT true, -- Require approval before tagging
    
    -- Bio
    bio TEXT,
    notes TEXT,
    
    -- Audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_delegates_event ON delegates(event_id);
CREATE INDEX idx_delegates_type ON delegates(delegate_type);
CREATE INDEX idx_delegates_country ON delegates(country);

-- Campaigns
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    
    -- Basic Info
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Campaign Type
    campaign_type VARCHAR(50) NOT NULL CHECK (campaign_type IN (
        'teaser', 'countdown', 'awareness', 'engagement', 
        'live_coverage', 'highlights', 'wrap_up', 'thank_you'
    )),
    
    -- Timeline
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    
    -- Target Audience
    target_audience JSONB DEFAULT '{}',
    target_platforms TEXT[], -- ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin']
    
    -- Goals & KPIs
    goals JSONB DEFAULT '[]',
    kpi_targets JSONB DEFAULT '{}',
    
    -- Budget
    budget_allocated DECIMAL(12, 2),
    budget_spent DECIMAL(12, 2) DEFAULT 0,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'archived')),
    
    -- Audit
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_campaigns_org ON campaigns(organization_id);
CREATE INDEX idx_campaigns_event ON campaigns(event_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);

-- ============================================
-- CONTENT MANAGEMENT
-- ============================================

-- Content Items
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    
    -- Content Type
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN (
        'post', 'reel', 'video', 'story', 'carousel', 'infographic', 'article'
    )),
    
    -- Content
    title VARCHAR(500),
    body TEXT,
    caption TEXT,
    hashtags TEXT[],
    
    -- Media Assets
    media_assets UUID[], -- Array of media_asset IDs
    
    -- Targeting
    target_platforms TEXT[] DEFAULT ARRAY['facebook', 'twitter', 'instagram', 'youtube', 'linkedin'],
    
    -- Platform-specific variants
    platform_variants JSONB DEFAULT '{}', -- {facebook: {caption, media}, twitter: {...}}
    
    -- Scheduling
    scheduled_for TIMESTAMP WITH TIME ZONE,
    publish_immediately BOOLEAN DEFAULT false,
    
    -- Mentions & Tags
    mentioned_delegates UUID[], -- Array of delegate IDs
    tags TEXT[],
    
    -- Workflow Status
    workflow_status VARCHAR(30) DEFAULT 'draft' CHECK (workflow_status IN (
        'draft', 'pending_approval', 'approved', 'rejected', 'published', 'scheduled', 'archived'
    )),
    
    -- Approval
    approval_required BOOLEAN DEFAULT true,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    
    -- Version Control
    version INT DEFAULT 1,
    parent_version_id UUID REFERENCES content(id),
    
    -- AI Assistance
    ai_generated BOOLEAN DEFAULT false,
    ai_metadata JSONB DEFAULT '{}',
    
    -- SEO
    seo_metadata JSONB DEFAULT '{}',
    
    -- Audit
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_content_org ON content(organization_id);
CREATE INDEX idx_content_event ON content(event_id);
CREATE INDEX idx_content_campaign ON content(campaign_id);
CREATE INDEX idx_content_status ON content(workflow_status);
CREATE INDEX idx_content_scheduled ON content(scheduled_for);

-- Content Templates
CREATE TABLE content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    
    content_type VARCHAR(50) NOT NULL,
    template_data JSONB NOT NULL, -- Design, placeholders, etc.
    
    thumbnail_url VARCHAR(500),
    
    is_public BOOLEAN DEFAULT false,
    usage_count INT DEFAULT 0,
    
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_templates_org ON content_templates(organization_id);
CREATE INDEX idx_templates_category ON content_templates(category);

-- ============================================
-- MEDIA MANAGEMENT
-- ============================================

-- Media Assets
CREATE TABLE media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- File Info
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL CHECK (file_type IN ('image', 'video', 'audio', 'document')),
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL, -- bytes
    
    -- Storage
    storage_provider VARCHAR(50) DEFAULT 's3',
    storage_path VARCHAR(500) NOT NULL,
    storage_url VARCHAR(500) NOT NULL,
    cdn_url VARCHAR(500),
    
    -- Metadata
    width INT,
    height INT,
    duration INT, -- seconds for video/audio
    metadata JSONB DEFAULT '{}',
    
    -- Processing
    processing_status VARCHAR(30) DEFAULT 'pending' CHECK (processing_status IN (
        'pending', 'processing', 'completed', 'failed'
    )),
    processed_variants JSONB DEFAULT '{}', -- {thumbnail, low_res, high_res, etc.}
    
    -- AI Analysis
    ai_tags TEXT[],
    ai_description TEXT,
    ai_analysis JSONB DEFAULT '{}',
    
    -- Usage
    is_public BOOLEAN DEFAULT false,
    usage_count INT DEFAULT 0,
    
    -- Audit
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_media_org ON media_assets(organization_id);
CREATE INDEX idx_media_type ON media_assets(file_type);
CREATE INDEX idx_media_status ON media_assets(processing_status);

-- ============================================
-- PUBLISHING & SOCIAL INTEGRATIONS
-- ============================================

-- Social Media Accounts
CREATE TABLE social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('facebook', 'twitter', 'instagram', 'youtube', 'linkedin')),
    account_type VARCHAR(50) CHECK (account_type IN ('page', 'profile', 'group', 'channel')),
    
    -- Account Info
    platform_user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    display_name VARCHAR(255),
    profile_url VARCHAR(500),
    avatar_url VARCHAR(500),
    
    -- OAuth Tokens
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Permissions
    scopes TEXT[],
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit
    connected_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_social_accounts_unique ON social_accounts(organization_id, platform, platform_user_id);
CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);

-- Published Posts
CREATE TABLE published_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    social_account_id UUID NOT NULL REFERENCES social_accounts(id) ON DELETE CASCADE,
    
    -- Platform Details
    platform VARCHAR(50) NOT NULL,
    platform_post_id VARCHAR(255) NOT NULL,
    platform_url VARCHAR(500),
    
    -- Published Content (snapshot at time of publish)
    published_content JSONB NOT NULL,
    
    -- Status
    publish_status VARCHAR(30) DEFAULT 'pending' CHECK (publish_status IN (
        'pending', 'publishing', 'published', 'failed', 'deleted'
    )),
    
    -- Error Handling
    error_message TEXT,
    retry_count INT DEFAULT 0,
    
    -- Timestamps
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_published_posts_content ON published_posts(content_id);
CREATE INDEX idx_published_posts_account ON published_posts(social_account_id);
CREATE INDEX idx_published_posts_platform ON published_posts(platform);
CREATE INDEX idx_published_posts_status ON published_posts(publish_status);

-- ============================================
-- ANALYTICS & METRICS
-- ============================================

-- Engagement Metrics (Time-series data)
CREATE TABLE engagement_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    published_post_id UUID NOT NULL REFERENCES published_posts(id) ON DELETE CASCADE,
    
    platform VARCHAR(50) NOT NULL,
    
    -- Metrics
    impressions BIGINT DEFAULT 0,
    reach BIGINT DEFAULT 0,
    likes BIGINT DEFAULT 0,
    comments BIGINT DEFAULT 0,
    shares BIGINT DEFAULT 0,
    saves BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    video_views BIGINT DEFAULT 0,
    
    -- Engagement Rate
    engagement_rate DECIMAL(5, 2),
    
    -- Platform-specific metrics
    platform_metrics JSONB DEFAULT '{}',
    
    -- Timestamp
    measured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_engagement_post ON engagement_metrics(published_post_id);
CREATE INDEX idx_engagement_platform ON engagement_metrics(platform);
CREATE INDEX idx_engagement_measured ON engagement_metrics(measured_at);

-- Sentiment Analysis
CREATE TABLE sentiment_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    published_post_id UUID REFERENCES published_posts(id) ON DELETE CASCADE,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    
    -- Source
    platform VARCHAR(50) NOT NULL,
    text_content TEXT NOT NULL,
    author_username VARCHAR(255),
    
    -- Sentiment
    sentiment VARCHAR(20) NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral', 'mixed')),
    sentiment_score DECIMAL(3, 2), -- -1.0 to 1.0
    confidence DECIMAL(3, 2),
    
    -- Entities & Keywords
    entities JSONB DEFAULT '[]',
    keywords TEXT[],
    
    -- AI Analysis
    ai_analysis JSONB DEFAULT '{}',
    
    -- Timestamps
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sentiment_post ON sentiment_analysis(published_post_id);
CREATE INDEX idx_sentiment_event ON sentiment_analysis(event_id);
CREATE INDEX idx_sentiment_platform ON sentiment_analysis(platform);
CREATE INDEX idx_sentiment_type ON sentiment_analysis(sentiment);

-- ============================================
-- WORKFLOW & APPROVALS
-- ============================================

-- Approval Workflows
CREATE TABLE approval_workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Workflow Steps
    steps JSONB NOT NULL, -- [{step: 1, role: 'approval_manager', required: true}]
    
    -- Conditions
    trigger_conditions JSONB DEFAULT '{}',
    
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_workflows_org ON approval_workflows(organization_id);

-- Approval Requests
CREATE TABLE approval_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID REFERENCES approval_workflows(id) ON DELETE SET NULL,
    content_id UUID NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    
    -- Request Info
    requested_by UUID NOT NULL REFERENCES users(id),
    current_step INT DEFAULT 1,
    
    -- Status
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'rejected', 'cancelled'
    )),
    
    -- Comments
    comments TEXT,
    
    -- Timestamps
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_approval_requests_content ON approval_requests(content_id);
CREATE INDEX idx_approval_requests_status ON approval_requests(status);

-- Approval Actions
CREATE TABLE approval_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    approval_request_id UUID NOT NULL REFERENCES approval_requests(id) ON DELETE CASCADE,
    
    step_number INT NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('approved', 'rejected', 'commented')),
    
    actioned_by UUID NOT NULL REFERENCES users(id),
    comment TEXT,
    
    actioned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_approval_actions_request ON approval_actions(approval_request_id);

-- ============================================
-- NOTIFICATIONS
-- ============================================

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification Type
    type VARCHAR(50) NOT NULL CHECK (type IN (
        'approval_request', 'content_published', 'mention', 'comment',
        'campaign_milestone', 'system_alert', 'engagement_spike'
    )),
    
    -- Content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500),
    
    -- Metadata
    metadata JSONB DEFAULT '{}',
    
    -- Status
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

-- ============================================
-- AUDIT LOGS
-- ============================================

-- Audit Trail
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Who
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    
    -- What
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    
    -- Details
    changes JSONB DEFAULT '{}', -- {before: {}, after: {}}
    metadata JSONB DEFAULT '{}',
    
    -- When & Where
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_assets_updated_at BEFORE UPDATE ON media_assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Full-text search indexes
CREATE INDEX idx_content_search ON content USING gin(to_tsvector('english', COALESCE(title, '') || ' ' || COALESCE(body, '') || ' ' || COALESCE(caption, '')));
CREATE INDEX idx_delegates_search ON delegates USING gin(to_tsvector('english', full_name || ' ' || COALESCE(designation, '') || ' ' || COALESCE(organization_name, '')));

-- Array indexes
CREATE INDEX idx_content_hashtags ON content USING gin(hashtags);
CREATE INDEX idx_content_platforms ON content USING gin(target_platforms);
CREATE INDEX idx_events_hashtags ON events USING gin(official_hashtags);

-- JSONB indexes
CREATE INDEX idx_organizations_settings ON organizations USING gin(settings);
CREATE INDEX idx_events_settings ON events USING gin(settings);
CREATE INDEX idx_users_permissions ON users USING gin(permissions);

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE organizations IS 'Multi-tenant organizations (e.g., Parliament of India)';
COMMENT ON TABLE users IS 'Platform users with role-based access control';
COMMENT ON TABLE events IS 'Major events like CSPOC 2026';
COMMENT ON TABLE delegates IS 'VIP attendees, speakers, and participants';
COMMENT ON TABLE campaigns IS 'Marketing campaigns tied to events';
COMMENT ON TABLE content IS 'Social media content (posts, reels, videos)';
COMMENT ON TABLE published_posts IS 'Content published to social platforms';
COMMENT ON TABLE engagement_metrics IS 'Time-series engagement data';
COMMENT ON TABLE sentiment_analysis IS 'AI-powered sentiment tracking';

-- ============================================
-- SEED DATA (for development)
-- ============================================

-- Insert default organization (Parliament of India)
INSERT INTO organizations (id, name, slug, description, country_code, timezone, subscription_tier)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Parliament of India', 'parliament-india', 'The Parliament of India', 'IND', 'Asia/Kolkata', 'government');

-- Insert super admin user
INSERT INTO users (id, organization_id, email, username, password_hash, first_name, last_name, role, is_active, is_verified)
VALUES 
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'admin@parliament.gov.in', 'admin', '$2b$10$XlKdPvKhUzXxCMwBM0jzJO7lFw3fJQP5xC5YnH8u4Jlm0YfH9Gv8m', 'System', 'Administrator', 'super_admin', true, true);

-- Insert CSPOC 2026 event
INSERT INTO events (id, organization_id, name, slug, description, start_date, end_date, timezone, status)
VALUES 
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '28th CSPOC 2026', 'cspoc-2026', '28th Conference of Speakers and Presiding Officers of the Commonwealth', '2026-01-14 00:00:00+05:30', '2026-01-17 23:59:59+05:30', 'Asia/Kolkata', 'planning');

