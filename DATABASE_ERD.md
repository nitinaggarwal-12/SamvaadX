# 📊 Entity Relationship Diagram (ERD)

## Guddu-Project Database Schema

```mermaid
erDiagram
    ORGANIZATIONS ||--o{ USERS : contains
    ORGANIZATIONS ||--o{ EVENTS : hosts
    ORGANIZATIONS ||--o{ CAMPAIGNS : runs
    ORGANIZATIONS ||--o{ CONTENT : owns
    ORGANIZATIONS ||--o{ MEDIA_ASSETS : stores
    ORGANIZATIONS ||--o{ CONTENT_TEMPLATES : creates
    ORGANIZATIONS ||--o{ SOCIAL_ACCOUNTS : manages
    ORGANIZATIONS ||--o{ APPROVAL_WORKFLOWS : defines
    ORGANIZATIONS ||--o{ AUDIT_LOGS : tracks
    
    USERS ||--o{ REFRESH_TOKENS : has
    USERS ||--o{ EVENTS : creates
    USERS ||--o{ CAMPAIGNS : initiates
    USERS ||--o{ CONTENT : creates
    USERS ||--o{ MEDIA_ASSETS : uploads
    USERS ||--o{ SOCIAL_ACCOUNTS : connects
    USERS ||--o{ APPROVAL_REQUESTS : requests
    USERS ||--o{ APPROVAL_ACTIONS : performs
    USERS ||--o{ NOTIFICATIONS : receives
    
    EVENTS ||--o{ EVENT_PHASES : includes
    EVENTS ||--o{ DELEGATES : invites
    EVENTS ||--o{ CAMPAIGNS : features
    EVENTS ||--o{ CONTENT : generates
    EVENTS ||--o{ SOCIAL_ACCOUNTS : uses
    EVENTS ||--o{ SENTIMENT_ANALYSIS : monitors
    
    CAMPAIGNS ||--o{ CONTENT : produces
    
    CONTENT ||--o{ PUBLISHED_POSTS : publishes
    CONTENT ||--o{ APPROVAL_REQUESTS : requires
    CONTENT ||--o{ CONTENT : versions
    
    SOCIAL_ACCOUNTS ||--o{ PUBLISHED_POSTS : posts_to
    
    PUBLISHED_POSTS ||--o{ ENGAGEMENT_METRICS : measures
    PUBLISHED_POSTS ||--o{ SENTIMENT_ANALYSIS : analyzes
    
    APPROVAL_WORKFLOWS ||--o{ APPROVAL_REQUESTS : follows
    APPROVAL_REQUESTS ||--o{ APPROVAL_ACTIONS : receives
    
    ORGANIZATIONS {
        uuid id PK
        string name
        string slug UK
        string description
        string logo_url
        string country_code
        json settings
        string status
        timestamp created_at
    }
    
    USERS {
        uuid id PK
        uuid organization_id FK
        string email UK
        string username UK
        string password_hash
        string first_name
        string last_name
        string role
        json permissions
        boolean is_active
        timestamp created_at
    }
    
    EVENTS {
        uuid id PK
        uuid organization_id FK
        string name
        string slug
        timestamp start_date
        timestamp end_date
        string timezone
        json social_handles
        string_array official_hashtags
        string status
        timestamp created_at
    }
    
    DELEGATES {
        uuid id PK
        uuid event_id FK
        string title
        string first_name
        string last_name
        string designation
        string country
        string delegate_type
        int vip_tier
        boolean auto_tag
        timestamp created_at
    }
    
    CAMPAIGNS {
        uuid id PK
        uuid organization_id FK
        uuid event_id FK
        string name
        string campaign_type
        timestamp start_date
        timestamp end_date
        string_array target_platforms
        json kpi_targets
        string status
        timestamp created_at
    }
    
    CONTENT {
        uuid id PK
        uuid organization_id FK
        uuid event_id FK
        uuid campaign_id FK
        string content_type
        string title
        text caption
        string_array hashtags
        uuid_array media_assets
        string_array target_platforms
        timestamp scheduled_for
        string workflow_status
        boolean approval_required
        timestamp created_at
    }
    
    CONTENT_TEMPLATES {
        uuid id PK
        uuid organization_id FK
        string name
        string content_type
        json template_data
        string thumbnail_url
        int usage_count
        timestamp created_at
    }
    
    MEDIA_ASSETS {
        uuid id PK
        uuid organization_id FK
        string filename
        string file_type
        string mime_type
        bigint file_size
        string storage_url
        string cdn_url
        int width
        int height
        string processing_status
        string_array ai_tags
        timestamp created_at
    }
    
    SOCIAL_ACCOUNTS {
        uuid id PK
        uuid organization_id FK
        uuid event_id FK
        string platform
        string platform_user_id
        string username
        text access_token
        timestamp token_expires_at
        boolean is_active
        timestamp created_at
    }
    
    PUBLISHED_POSTS {
        uuid id PK
        uuid content_id FK
        uuid social_account_id FK
        string platform
        string platform_post_id
        string platform_url
        json published_content
        string publish_status
        timestamp published_at
        timestamp created_at
    }
    
    ENGAGEMENT_METRICS {
        uuid id PK
        uuid published_post_id FK
        string platform
        bigint impressions
        bigint reach
        bigint likes
        bigint comments
        bigint shares
        decimal engagement_rate
        timestamp measured_at
        timestamp created_at
    }
    
    SENTIMENT_ANALYSIS {
        uuid id PK
        uuid published_post_id FK
        uuid event_id FK
        string platform
        text text_content
        string sentiment
        decimal sentiment_score
        json entities
        string_array keywords
        timestamp analyzed_at
    }
    
    APPROVAL_WORKFLOWS {
        uuid id PK
        uuid organization_id FK
        string name
        json steps
        json trigger_conditions
        boolean is_active
        timestamp created_at
    }
    
    APPROVAL_REQUESTS {
        uuid id PK
        uuid workflow_id FK
        uuid content_id FK
        uuid requested_by FK
        int current_step
        string status
        timestamp requested_at
        timestamp resolved_at
    }
    
    APPROVAL_ACTIONS {
        uuid id PK
        uuid approval_request_id FK
        int step_number
        string action
        uuid actioned_by FK
        text comment
        timestamp actioned_at
    }
    
    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        string type
        string title
        text message
        boolean is_read
        timestamp created_at
    }
    
    AUDIT_LOGS {
        uuid id PK
        uuid organization_id FK
        uuid user_id FK
        string action
        string entity_type
        uuid entity_id
        json changes
        string ip_address
        timestamp created_at
    }
```

---

## Schema Statistics

### Total Tables: 22

#### Core Domain (8 tables)
- Organizations
- Users
- Events
- Delegates
- Campaigns
- Content
- Media Assets
- Content Templates

#### Social Media (3 tables)
- Social Accounts
- Published Posts
- Engagement Metrics

#### Analytics & Intelligence (1 table)
- Sentiment Analysis

#### Workflow & Governance (3 tables)
- Approval Workflows
- Approval Requests
- Approval Actions

#### System (4 tables)
- Notifications
- Audit Logs
- Refresh Tokens
- Event Phases

---

## Key Relationships

### One-to-Many Relationships
- **Organization → Users**: 1:N (Multi-tenancy)
- **Organization → Events**: 1:N
- **Event → Delegates**: 1:N
- **Event → Campaigns**: 1:N
- **Campaign → Content**: 1:N
- **Content → Published Posts**: 1:N
- **Published Post → Engagement Metrics**: 1:N
- **Approval Request → Approval Actions**: 1:N

### Self-Referential Relationships
- **Content → Content**: Version history (parent-child)

### Optional Relationships (SetNull on Delete)
- **Campaign.event_id**: Optional (campaigns can exist without events)
- **Content.event_id**: Optional
- **Content.campaign_id**: Optional
- **ApprovalRequest.workflow_id**: Optional (manual approvals)

---

## Data Modeling Principles

### 1. **Multi-Tenancy**
- Every major entity links to `organization_id`
- Row-level security enforced at application layer
- Logical data isolation

### 2. **Soft Deletes**
- Major entities have `deleted_at` timestamp
- Enables data recovery and audit compliance
- Physical deletion for GDPR compliance when requested

### 3. **Audit Trail**
- Every write operation logged to `audit_logs`
- Immutable historical record
- Supports compliance and debugging

### 4. **Versioning**
- Content has version control via `parent_version_id`
- Enables rollback and change tracking
- Approval history preserved

### 5. **Flexibility**
- JSONB columns for extensibility (`settings`, `metadata`)
- Array columns for tags, hashtags, platforms
- Supports evolving requirements without schema migrations

### 6. **Time-Series Optimization**
- Engagement metrics partitioned by time (TimescaleDB)
- Fast queries for dashboards
- Efficient aggregations

### 7. **Security**
- Passwords bcrypt hashed
- OAuth tokens encrypted at rest
- IP addresses and user agents logged
- Two-factor authentication support

---

## Indexing Strategy

### Primary Indexes
- UUID primary keys on all tables (clustered)
- Foreign key indexes automatically created

### Performance Indexes
- **Users**: email, organization_id, role, is_active
- **Events**: slug, status, dates
- **Content**: workflow_status, scheduled_for, organization_id
- **Published Posts**: platform, publish_status
- **Engagement Metrics**: measured_at (time-series)
- **Notifications**: user_id, is_read, created_at

### Full-Text Search Indexes
- Content: title + body + caption (GIN index)
- Delegates: name + designation + organization (GIN index)

### Composite Indexes
- `(organization_id, slug)` on Events (unique)
- `(organization_id, platform, platform_user_id)` on Social Accounts (unique)
- `(entity_type, entity_id)` on Audit Logs

---

## Scalability Considerations

### Partitioning Strategy
- **Engagement Metrics**: Partition by time (monthly)
- **Sentiment Analysis**: Partition by time (monthly)
- **Audit Logs**: Partition by time (quarterly)

### Read Replicas
- Analytics queries → Read replica
- Dashboard queries → Read replica
- Transactional writes → Primary

### Caching Strategy
- User sessions → Redis
- Content drafts → Redis (TTL 1 hour)
- Engagement metrics → Redis (TTL 5 minutes)
- Social account tokens → Redis (secure)

### Archive Strategy
- Engagement metrics older than 2 years → Cold storage (S3)
- Audit logs older than 5 years → Archive
- Deleted content after 90 days → Permanent deletion (GDPR)

---

*Database designed for planetary scale* 🌍

