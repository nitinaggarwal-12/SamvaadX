# 🚀 REST API Specification

## Guddu-Project API v1.0

**Base URL**: `https://api.guddu-project.com/v1`  
**Protocol**: HTTPS only  
**Authentication**: JWT Bearer tokens  
**Rate Limiting**: 1000 req/min per user, 10000 req/min per organization

---

## Table of Contents

1. [Authentication](#authentication)
2. [Users & Organizations](#users--organizations)
3. [Events & Campaigns](#events--campaigns)
4. [Content Management](#content-management)
5. [Media Management](#media-management)
6. [Publishing](#publishing)
7. [Analytics](#analytics)
8. [Social Integrations](#social-integrations)
9. [AI Services](#ai-services)
10. [Workflows & Approvals](#workflows--approvals)

---

## 1. Authentication APIs

### POST /auth/register
**Description**: Register a new user  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "organizationSlug": "parliament-india",
  "role": "content_creator"
}
```

**Response** (201 Created):
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "content_creator",
    "isVerified": false
  },
  "message": "Registration successful. Please verify your email."
}
```

---

### POST /auth/login
**Description**: Authenticate user and receive JWT tokens  
**Auth Required**: No

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "uuid-refresh-token",
  "expiresIn": 3600,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "content_creator",
    "organization": {
      "id": "uuid",
      "name": "Parliament of India",
      "slug": "parliament-india"
    },
    "permissions": ["content.create", "content.read", "media.upload"]
  }
}
```

---

### POST /auth/refresh
**Description**: Refresh access token using refresh token  
**Auth Required**: No (requires refresh token)

**Request Body**:
```json
{
  "refreshToken": "uuid-refresh-token"
}
```

**Response** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

---

### POST /auth/logout
**Description**: Invalidate refresh token  
**Auth Required**: Yes

**Response** (200 OK):
```json
{
  "message": "Logout successful"
}
```

---

### GET /auth/me
**Description**: Get current authenticated user info  
**Auth Required**: Yes

**Response** (200 OK):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "avatarUrl": "https://cdn.guddu-project.com/avatars/user.jpg",
  "role": "content_creator",
  "permissions": ["content.create", "content.read", "media.upload"],
  "organization": {
    "id": "uuid",
    "name": "Parliament of India",
    "slug": "parliament-india",
    "logoUrl": "https://cdn.guddu-project.com/logos/org.png"
  },
  "lastLoginAt": "2026-01-10T10:30:00Z"
}
```

---

## 2. Users & Organizations APIs

### GET /organizations/:slug
**Description**: Get organization details  
**Auth Required**: Yes  
**Permissions**: `organization.read`

**Response** (200 OK):
```json
{
  "id": "uuid",
  "name": "Parliament of India",
  "slug": "parliament-india",
  "description": "The Parliament of India",
  "logoUrl": "https://cdn.guddu-project.com/logos/org.png",
  "website": "https://parliament.gov.in",
  "countryCode": "IND",
  "timezone": "Asia/Kolkata",
  "subscriptionTier": "government",
  "settings": {
    "brandColors": ["#FF6600", "#FFFFFF", "#138808"],
    "requiresApproval": true
  },
  "stats": {
    "totalUsers": 45,
    "activeEvents": 2,
    "totalContent": 1240,
    "totalPublishedPosts": 856
  }
}
```

---

### GET /users
**Description**: List users in organization  
**Auth Required**: Yes  
**Permissions**: `users.read`  
**Query Params**: `?page=1&limit=20&role=content_creator&search=john`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "john@parliament.gov.in",
      "firstName": "John",
      "lastName": "Doe",
      "role": "content_creator",
      "avatarUrl": "https://cdn.guddu-project.com/avatars/user.jpg",
      "isActive": true,
      "lastLoginAt": "2026-01-10T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

---

### POST /users
**Description**: Create a new user (admin only)  
**Auth Required**: Yes  
**Permissions**: `users.create`

**Request Body**:
```json
{
  "email": "newuser@parliament.gov.in",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "strategy_lead",
  "password": "SecurePass123!",
  "sendInvite": true
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "email": "newuser@parliament.gov.in",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "strategy_lead",
  "isActive": true,
  "createdAt": "2026-01-10T11:00:00Z"
}
```

---

## 3. Events & Campaigns APIs

### POST /events
**Description**: Create a new event  
**Auth Required**: Yes  
**Permissions**: `events.create`

**Request Body**:
```json
{
  "name": "28th CSPOC 2026",
  "slug": "cspoc-2026",
  "description": "28th Conference of Speakers and Presiding Officers of the Commonwealth",
  "tagline": "Unity in Diversity",
  "startDate": "2026-01-14T00:00:00+05:30",
  "endDate": "2026-01-17T23:59:59+05:30",
  "timezone": "Asia/Kolkata",
  "location": {
    "venue": "Parliament House",
    "city": "New Delhi",
    "country": "India",
    "coordinates": {"lat": 28.6139, "lng": 77.2090}
  },
  "officialHashtags": ["#CSPOC2026", "#CommonwealthSpeakers", "#ParliamentOfIndia"],
  "socialHandles": {
    "twitter": "@CSPOCIndia2026",
    "facebook": "CSPOCIndia2026",
    "instagram": "cspoc_india_2026"
  }
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "name": "28th CSPOC 2026",
  "slug": "cspoc-2026",
  "status": "planning",
  "startDate": "2026-01-14T00:00:00+05:30",
  "endDate": "2026-01-17T23:59:59+05:30",
  "createdAt": "2026-01-10T11:00:00Z"
}
```

---

### GET /events/:id
**Description**: Get event details  
**Auth Required**: Yes  
**Permissions**: `events.read`

**Response** (200 OK):
```json
{
  "id": "uuid",
  "name": "28th CSPOC 2026",
  "slug": "cspoc-2026",
  "description": "28th Conference of Speakers and Presiding Officers of the Commonwealth",
  "startDate": "2026-01-14T00:00:00+05:30",
  "endDate": "2026-01-17T23:59:59+05:30",
  "location": {
    "venue": "Parliament House",
    "city": "New Delhi",
    "country": "India"
  },
  "officialHashtags": ["#CSPOC2026", "#CommonwealthSpeakers"],
  "status": "planning",
  "stats": {
    "totalDelegates": 156,
    "totalCampaigns": 8,
    "totalContent": 340,
    "totalPublishedPosts": 218
  }
}
```

---

### POST /events/:id/delegates
**Description**: Add delegates to an event  
**Auth Required**: Yes  
**Permissions**: `delegates.create`

**Request Body**:
```json
{
  "title": "Hon.",
  "firstName": "Patricia",
  "lastName": "Johnson",
  "designation": "Speaker",
  "organizationName": "Australian Parliament",
  "country": "Australia",
  "email": "patricia.johnson@parliament.au",
  "delegateType": "speaker",
  "vipTier": 1,
  "socialHandles": {
    "twitter": "@PatJohnsonMP"
  },
  "autoTag": true,
  "requiresApproval": true
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "fullName": "Hon. Patricia Johnson",
  "designation": "Speaker",
  "organizationName": "Australian Parliament",
  "country": "Australia",
  "delegateType": "speaker",
  "vipTier": 1
}
```

---

### POST /campaigns
**Description**: Create a campaign  
**Auth Required**: Yes  
**Permissions**: `campaigns.create`

**Request Body**:
```json
{
  "name": "Pre-Event Awareness Campaign",
  "slug": "pre-event-awareness",
  "description": "Build awareness about CSPOC 2026 before the event",
  "campaignType": "awareness",
  "eventId": "uuid",
  "startDate": "2025-12-01T00:00:00+05:30",
  "endDate": "2026-01-13T23:59:59+05:30",
  "targetPlatforms": ["facebook", "twitter", "instagram", "linkedin"],
  "goals": ["Reach 50M people", "Generate 5M engagements"],
  "kpiTargets": {
    "reach": 50000000,
    "engagements": 5000000,
    "impressions": 100000000
  }
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "name": "Pre-Event Awareness Campaign",
  "slug": "pre-event-awareness",
  "campaignType": "awareness",
  "status": "draft",
  "startDate": "2025-12-01T00:00:00+05:30",
  "endDate": "2026-01-13T23:59:59+05:30"
}
```

---

## 4. Content Management APIs

### POST /content
**Description**: Create new content (post, reel, video, etc.)  
**Auth Required**: Yes  
**Permissions**: `content.create`

**Request Body**:
```json
{
  "contentType": "post",
  "title": "CSPOC 2026 - Countdown Begins!",
  "caption": "Just 4 days to go! The 28th Conference of Speakers and Presiding Officers of the Commonwealth begins on January 14th. #CSPOC2026 #CommonwealthSpeakers",
  "hashtags": ["#CSPOC2026", "#CommonwealthSpeakers", "#ParliamentOfIndia"],
  "mediaAssets": ["uuid-media-1", "uuid-media-2"],
  "targetPlatforms": ["facebook", "twitter", "instagram"],
  "eventId": "uuid",
  "campaignId": "uuid",
  "scheduledFor": "2026-01-10T12:00:00+05:30",
  "mentionedDelegates": ["uuid-delegate-1"],
  "approvalRequired": true
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "contentType": "post",
  "title": "CSPOC 2026 - Countdown Begins!",
  "workflowStatus": "draft",
  "scheduledFor": "2026-01-10T12:00:00+05:30",
  "createdAt": "2026-01-09T10:00:00Z",
  "createdBy": {
    "id": "uuid",
    "name": "John Doe"
  }
}
```

---

### GET /content
**Description**: List content with filters  
**Auth Required**: Yes  
**Permissions**: `content.read`  
**Query Params**: `?page=1&limit=20&status=draft&eventId=uuid&campaignId=uuid`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "contentType": "post",
      "title": "CSPOC 2026 - Countdown Begins!",
      "caption": "Just 4 days to go! The 28th Conference...",
      "workflowStatus": "draft",
      "scheduledFor": "2026-01-10T12:00:00+05:30",
      "mediaAssets": [
        {
          "id": "uuid",
          "thumbnailUrl": "https://cdn.guddu-project.com/thumbs/img1.jpg"
        }
      ],
      "targetPlatforms": ["facebook", "twitter", "instagram"],
      "createdBy": {
        "id": "uuid",
        "name": "John Doe",
        "avatarUrl": "https://cdn.guddu-project.com/avatars/user.jpg"
      },
      "createdAt": "2026-01-09T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 340,
    "totalPages": 17
  }
}
```

---

### GET /content/:id
**Description**: Get content details  
**Auth Required**: Yes  
**Permissions**: `content.read`

**Response** (200 OK):
```json
{
  "id": "uuid",
  "contentType": "post",
  "title": "CSPOC 2026 - Countdown Begins!",
  "caption": "Just 4 days to go! The 28th Conference of Speakers and Presiding Officers of the Commonwealth begins on January 14th.",
  "hashtags": ["#CSPOC2026", "#CommonwealthSpeakers"],
  "mediaAssets": [
    {
      "id": "uuid",
      "fileType": "image",
      "url": "https://cdn.guddu-project.com/media/img1.jpg",
      "thumbnailUrl": "https://cdn.guddu-project.com/thumbs/img1.jpg",
      "width": 1920,
      "height": 1080
    }
  ],
  "targetPlatforms": ["facebook", "twitter", "instagram"],
  "platformVariants": {
    "twitter": {
      "caption": "Just 4 days to go! #CSPOC2026 begins Jan 14th."
    }
  },
  "workflowStatus": "draft",
  "approvalRequired": true,
  "scheduledFor": "2026-01-10T12:00:00+05:30",
  "event": {
    "id": "uuid",
    "name": "28th CSPOC 2026"
  },
  "campaign": {
    "id": "uuid",
    "name": "Pre-Event Awareness Campaign"
  },
  "createdBy": {
    "id": "uuid",
    "name": "John Doe"
  },
  "createdAt": "2026-01-09T10:00:00Z",
  "updatedAt": "2026-01-09T11:30:00Z"
}
```

---

### PATCH /content/:id
**Description**: Update content  
**Auth Required**: Yes  
**Permissions**: `content.update`

**Request Body** (partial update):
```json
{
  "caption": "Updated caption with more details...",
  "scheduledFor": "2026-01-10T14:00:00+05:30"
}
```

**Response** (200 OK):
```json
{
  "id": "uuid",
  "caption": "Updated caption with more details...",
  "scheduledFor": "2026-01-10T14:00:00+05:30",
  "updatedAt": "2026-01-09T12:00:00Z"
}
```

---

### DELETE /content/:id
**Description**: Delete content (soft delete)  
**Auth Required**: Yes  
**Permissions**: `content.delete`

**Response** (204 No Content)

---

## 5. Media Management APIs

### POST /media/upload
**Description**: Upload media files (images, videos)  
**Auth Required**: Yes  
**Permissions**: `media.upload`  
**Content-Type**: `multipart/form-data`

**Form Data**:
```
file: [binary]
fileType: "image"
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "filename": "cspoc-banner.jpg",
  "originalFilename": "my-banner.jpg",
  "fileType": "image",
  "mimeType": "image/jpeg",
  "fileSize": 2048576,
  "width": 1920,
  "height": 1080,
  "storageUrl": "https://s3.amazonaws.com/guddu-media/...",
  "cdnUrl": "https://cdn.guddu-project.com/media/cspoc-banner.jpg",
  "thumbnailUrl": "https://cdn.guddu-project.com/thumbs/cspoc-banner.jpg",
  "processingStatus": "completed",
  "aiTags": ["parliament", "building", "flag", "architecture"],
  "aiDescription": "The Parliament House of India with Indian flag",
  "uploadedBy": {
    "id": "uuid",
    "name": "John Doe"
  },
  "createdAt": "2026-01-09T10:00:00Z"
}
```

---

### GET /media
**Description**: List media assets  
**Auth Required**: Yes  
**Permissions**: `media.read`  
**Query Params**: `?page=1&limit=20&fileType=image&search=parliament`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "filename": "cspoc-banner.jpg",
      "fileType": "image",
      "thumbnailUrl": "https://cdn.guddu-project.com/thumbs/cspoc-banner.jpg",
      "width": 1920,
      "height": 1080,
      "fileSize": 2048576,
      "aiTags": ["parliament", "building"],
      "createdAt": "2026-01-09T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 856,
    "totalPages": 43
  }
}
```

---

## 6. Publishing APIs

### POST /content/:id/publish
**Description**: Publish content to social platforms  
**Auth Required**: Yes  
**Permissions**: `content.publish`

**Request Body**:
```json
{
  "platforms": ["facebook", "twitter", "instagram"],
  "publishImmediately": true
}
```

**Response** (202 Accepted):
```json
{
  "message": "Content queued for publishing",
  "publishJobs": [
    {
      "platform": "facebook",
      "status": "pending",
      "jobId": "uuid"
    },
    {
      "platform": "twitter",
      "status": "pending",
      "jobId": "uuid"
    }
  ]
}
```

---

### GET /published-posts
**Description**: Get published posts history  
**Auth Required**: Yes  
**Permissions**: `content.read`  
**Query Params**: `?page=1&limit=20&platform=facebook&status=published`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "platform": "facebook",
      "platformPostId": "123456789",
      "platformUrl": "https://facebook.com/posts/123456789",
      "publishStatus": "published",
      "publishedAt": "2026-01-10T12:05:23Z",
      "content": {
        "id": "uuid",
        "title": "CSPOC 2026 - Countdown Begins!"
      },
      "socialAccount": {
        "username": "ParliamentIndia",
        "displayName": "Parliament of India"
      },
      "metrics": {
        "impressions": 125000,
        "reach": 98000,
        "likes": 5600,
        "comments": 234,
        "shares": 890
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 218,
    "totalPages": 11
  }
}
```

---

## 7. Analytics APIs

### GET /analytics/dashboard
**Description**: Get dashboard analytics overview  
**Auth Required**: Yes  
**Permissions**: `analytics.read`  
**Query Params**: `?eventId=uuid&startDate=2026-01-01&endDate=2026-01-17`

**Response** (200 OK):
```json
{
  "summary": {
    "totalPosts": 218,
    "totalImpressions": 45000000,
    "totalReach": 32000000,
    "totalEngagements": 2800000,
    "engagementRate": 6.22,
    "followers": {
      "gained": 15000,
      "lost": 230
    }
  },
  "platformBreakdown": [
    {
      "platform": "facebook",
      "posts": 78,
      "impressions": 18000000,
      "reach": 12000000,
      "engagements": 1200000
    },
    {
      "platform": "twitter",
      "posts": 65,
      "impressions": 15000000,
      "reach": 10000000,
      "engagements": 980000
    }
  ],
  "topPosts": [
    {
      "id": "uuid",
      "title": "Opening Ceremony Highlights",
      "platform": "facebook",
      "impressions": 2500000,
      "engagementRate": 12.5
    }
  ],
  "sentiment": {
    "positive": 78,
    "neutral": 18,
    "negative": 4
  }
}
```

---

### GET /analytics/engagement-metrics/:publishedPostId
**Description**: Get detailed engagement metrics for a post  
**Auth Required**: Yes  
**Permissions**: `analytics.read`

**Response** (200 OK):
```json
{
  "publishedPost": {
    "id": "uuid",
    "platform": "facebook",
    "publishedAt": "2026-01-14T10:00:00Z"
  },
  "metrics": [
    {
      "measuredAt": "2026-01-14T11:00:00Z",
      "impressions": 50000,
      "reach": 38000,
      "likes": 1200,
      "comments": 45,
      "shares": 89
    },
    {
      "measuredAt": "2026-01-14T12:00:00Z",
      "impressions": 125000,
      "reach": 95000,
      "likes": 3200,
      "comments": 120,
      "shares": 234
    }
  ],
  "totals": {
    "impressions": 2500000,
    "reach": 1800000,
    "likes": 56000,
    "comments": 2340,
    "shares": 8900,
    "engagementRate": 12.5
  }
}
```

---

## 8. Social Integrations APIs

### POST /social-accounts/connect
**Description**: Connect a social media account via OAuth  
**Auth Required**: Yes  
**Permissions**: `social_accounts.create`

**Request Body**:
```json
{
  "platform": "facebook",
  "authCode": "oauth-authorization-code-from-callback"
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "platform": "facebook",
  "platformUserId": "123456789",
  "username": "ParliamentIndia",
  "displayName": "Parliament of India",
  "profileUrl": "https://facebook.com/ParliamentIndia",
  "isActive": true,
  "connectedAt": "2026-01-09T10:00:00Z"
}
```

---

### GET /social-accounts
**Description**: List connected social accounts  
**Auth Required**: Yes  
**Permissions**: `social_accounts.read`

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": "uuid",
      "platform": "facebook",
      "username": "ParliamentIndia",
      "displayName": "Parliament of India",
      "avatarUrl": "https://facebook.com/avatar.jpg",
      "isActive": true,
      "lastSyncAt": "2026-01-10T09:00:00Z"
    },
    {
      "platform": "twitter",
      "username": "ParliamentIndia",
      "isActive": true
    }
  ]
}
```

---

## 9. AI Services APIs

### POST /ai/generate-caption
**Description**: AI-powered caption generation  
**Auth Required**: Yes  
**Permissions**: `ai.generate`

**Request Body**:
```json
{
  "prompt": "Generate a caption for the opening ceremony of CSPOC 2026",
  "tone": "formal",
  "length": "medium",
  "hashtags": ["#CSPOC2026", "#Commonwealth"],
  "platform": "instagram"
}
```

**Response** (200 OK):
```json
{
  "caption": "🏛️ The 28th Conference of Speakers and Presiding Officers of the Commonwealth opens today in New Delhi! Honored to welcome distinguished speakers from across the Commonwealth nations. Together, we strengthen parliamentary democracy. #CSPOC2026 #Commonwealth #ParliamentaryDemocracy",
  "alternatives": [
    "Alternative caption 1...",
    "Alternative caption 2..."
  ],
  "metadata": {
    "model": "gpt-4",
    "tokens": 156
  }
}
```

---

### POST /ai/analyze-sentiment
**Description**: Analyze sentiment of text  
**Auth Required**: Yes  
**Permissions**: `ai.analyze`

**Request Body**:
```json
{
  "text": "Amazing event! So proud to be part of CSPOC 2026. Historic moment for India!",
  "context": "social_media_comment"
}
```

**Response** (200 OK):
```json
{
  "sentiment": "positive",
  "sentimentScore": 0.92,
  "confidence": 0.96,
  "entities": ["CSPOC 2026", "India"],
  "keywords": ["amazing", "proud", "historic"],
  "emotions": {
    "joy": 0.85,
    "pride": 0.78,
    "excitement": 0.72
  }
}
```

---

## 10. Workflows & Approvals APIs

### POST /approval-requests
**Description**: Submit content for approval  
**Auth Required**: Yes  
**Permissions**: `approvals.request`

**Request Body**:
```json
{
  "contentId": "uuid",
  "workflowId": "uuid",
  "comments": "Ready for approval - urgent for tomorrow's post"
}
```

**Response** (201 Created):
```json
{
  "id": "uuid",
  "contentId": "uuid",
  "workflow": {
    "id": "uuid",
    "name": "Standard Content Approval"
  },
  "currentStep": 1,
  "status": "pending",
  "requestedAt": "2026-01-09T15:00:00Z"
}
```

---

### POST /approval-requests/:id/approve
**Description**: Approve content at current workflow step  
**Auth Required**: Yes  
**Permissions**: `approvals.manage`

**Request Body**:
```json
{
  "comment": "Approved. Looks great!"
}
```

**Response** (200 OK):
```json
{
  "id": "uuid",
  "status": "approved",
  "resolvedAt": "2026-01-09T15:30:00Z",
  "action": {
    "actionedBy": {
      "id": "uuid",
      "name": "Dr. Meera Sharma"
    },
    "comment": "Approved. Looks great!",
    "actionedAt": "2026-01-09T15:30:00Z"
  }
}
```

---

### POST /approval-requests/:id/reject
**Description**: Reject content  
**Auth Required**: Yes  
**Permissions**: `approvals.manage`

**Request Body**:
```json
{
  "comment": "Please revise the caption - needs more formal tone"
}
```

**Response** (200 OK):
```json
{
  "id": "uuid",
  "status": "rejected",
  "resolvedAt": "2026-01-09T15:30:00Z",
  "action": {
    "actionedBy": {
      "id": "uuid",
      "name": "Deepak Malhotra"
    },
    "comment": "Please revise the caption - needs more formal tone",
    "actionedAt": "2026-01-09T15:30:00Z"
  }
}
```

---

## Error Responses

All error responses follow this structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "Additional error context"
    },
    "timestamp": "2026-01-10T10:00:00Z",
    "requestId": "uuid"
  }
}
```

### Common HTTP Status Codes

- **200 OK**: Success
- **201 Created**: Resource created
- **202 Accepted**: Async operation queued
- **204 No Content**: Success with no response body
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict (e.g., duplicate)
- **422 Unprocessable Entity**: Validation error
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error
- **503 Service Unavailable**: Temporary outage

---

## Rate Limiting

**Headers** (included in every response):
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1704889200
```

---

## Pagination

All list endpoints support pagination:

**Query Params**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response** includes:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 340,
    "totalPages": 17,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

---

*API designed for global scale and enterprise reliability* 🚀

