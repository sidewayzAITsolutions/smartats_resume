# SmartATS Resume Builder - API Documentation

This document provides comprehensive documentation for all API endpoints in the SmartATS Resume Builder application.

## 🔗 Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`

## 🔐 Authentication

The application uses Supabase Auth for authentication. Most API endpoints require authentication via JWT tokens.

### Authentication Headers
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 📋 API Endpoints

### 1. Stripe Integration

#### Create Checkout Session
Creates a Stripe checkout session for premium subscription.

**Endpoint**: `POST /api/create-checkout-session`

**Authentication**: Required

**Request Body**:
```json
{
  "priceId": "price_1234567890",
  "successUrl": "https://yourdomain.com/payment/success",
  "cancelUrl": "https://yourdomain.com/pricing"
}
```

**Response**:
```json
{
  "sessionId": "cs_test_1234567890",
  "url": "https://checkout.stripe.com/pay/cs_test_1234567890"
}
```

**Error Responses**:
```json
// 401 Unauthorized
{
  "error": "Authentication required"
}

// 400 Bad Request
{
  "error": "Invalid price ID"
}

// 500 Internal Server Error
{
  "error": "Failed to create checkout session"
}
```

#### Stripe Webhook Handler
Handles Stripe webhook events for subscription management.

**Endpoint**: `POST /api/webhooks/stripe`

**Authentication**: Webhook signature verification

**Supported Events**:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Request Headers**:
```http
Stripe-Signature: t=1234567890,v1=signature_hash
```

**Response**:
```json
{
  "received": true
}
```

### 2. AI Integration (Future Enhancement)

#### AI Content Generation
Generates AI-powered resume content suggestions.

**Endpoint**: `POST /api/ai/complete`

**Authentication**: Required

**Request Body**:
```json
{
  "prompt": "Generate professional summary for software engineer",
  "context": {
    "jobTitle": "Software Engineer",
    "experience": "5 years",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

**Response**:
```json
{
  "completion": "Experienced software engineer with 5+ years...",
  "suggestions": [
    "Consider adding specific project examples",
    "Include quantifiable achievements"
  ]
}
```

#### Resume Analysis
Analyzes resume content for ATS optimization.

**Endpoint**: `POST /api/ai/analyze`

**Authentication**: Required

**Request Body**:
```json
{
  "resumeContent": "John Doe\nSoftware Engineer...",
  "jobDescription": "We are looking for a senior software engineer..."
}
```

**Response**:
```json
{
  "score": 85,
  "analysis": {
    "keywordMatch": 78,
    "formatting": 95,
    "readability": 88,
    "completeness": 82
  },
  "suggestions": [
    "Add more relevant keywords from job description",
    "Include specific technologies mentioned in the job posting"
  ],
  "missingKeywords": ["Python", "AWS", "Docker"],
  "recommendations": [
    {
      "section": "skills",
      "suggestion": "Add cloud computing experience",
      "priority": "high"
    }
  ]
}
```

### 3. Resume Management

#### Get User Resumes
Retrieves all resumes for the authenticated user.

**Endpoint**: `GET /api/resumes`

**Authentication**: Required

**Query Parameters**:
- `limit` (optional): Number of resumes to return (default: 10)
- `offset` (optional): Number of resumes to skip (default: 0)

**Response**:
```json
{
  "resumes": [
    {
      "id": "uuid-1234",
      "title": "Software Engineer Resume",
      "templateId": "professional",
      "atsScore": 85,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-16T14:20:00Z"
    }
  ],
  "total": 5,
  "hasMore": false
}
```

#### Create Resume
Creates a new resume for the authenticated user.

**Endpoint**: `POST /api/resumes`

**Authentication**: Required

**Request Body**:
```json
{
  "title": "My New Resume",
  "templateId": "professional",
  "content": {
    "personal": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "experience": [],
    "education": [],
    "skills": []
  }
}
```

**Response**:
```json
{
  "id": "uuid-5678",
  "title": "My New Resume",
  "templateId": "professional",
  "atsScore": 0,
  "createdAt": "2024-01-17T09:15:00Z"
}
```

#### Update Resume
Updates an existing resume.

**Endpoint**: `PUT /api/resumes/[id]`

**Authentication**: Required

**Request Body**:
```json
{
  "title": "Updated Resume Title",
  "content": {
    "personal": {
      "fullName": "John Doe",
      "email": "john.doe@example.com"
    }
  }
}
```

**Response**:
```json
{
  "id": "uuid-5678",
  "title": "Updated Resume Title",
  "atsScore": 78,
  "updatedAt": "2024-01-17T15:30:00Z"
}
```

#### Delete Resume
Deletes a resume.

**Endpoint**: `DELETE /api/resumes/[id]`

**Authentication**: Required

**Response**:
```json
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

### 4. Template Management

#### Get Templates
Retrieves available resume templates.

**Endpoint**: `GET /api/templates`

**Authentication**: Optional (affects premium template visibility)

**Query Parameters**:
- `category` (optional): Filter by category (business, creative, technical)
- `premium` (optional): Filter by premium status (true/false)

**Response**:
```json
{
  "templates": [
    {
      "id": "professional",
      "name": "Professional",
      "description": "Clean and professional template",
      "category": "business",
      "isPremium": false,
      "previewImageUrl": "/templates/professional-preview.png"
    },
    {
      "id": "executive-elite",
      "name": "Executive Elite",
      "description": "Premium template for executives",
      "category": "business",
      "isPremium": true,
      "previewImageUrl": "/templates/executive-elite-preview.png"
    }
  ]
}
```

### 5. User Profile Management

#### Get User Profile
Retrieves the authenticated user's profile.

**Endpoint**: `GET /api/profile`

**Authentication**: Required

**Response**:
```json
{
  "id": "uuid-user",
  "email": "user@example.com",
  "fullName": "John Doe",
  "isPremium": true,
  "subscriptionStatus": "active",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update User Profile
Updates the authenticated user's profile.

**Endpoint**: `PUT /api/profile`

**Authentication**: Required

**Request Body**:
```json
{
  "fullName": "John Smith",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response**:
```json
{
  "id": "uuid-user",
  "email": "user@example.com",
  "fullName": "John Smith",
  "avatarUrl": "https://example.com/avatar.jpg",
  "updatedAt": "2024-01-17T16:45:00Z"
}
```

### 6. Health Check

#### Health Check
Checks the health status of the application.

**Endpoint**: `GET /api/health`

**Authentication**: Not required

**Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-17T12:00:00Z",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "stripe": "connected"
  }
}
```

## 🔧 Error Handling

### Standard Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  },
  "timestamp": "2024-01-17T12:00:00Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

### Common Error Codes
- `AUTH_REQUIRED` - Authentication required
- `INVALID_TOKEN` - Invalid or expired token
- `PREMIUM_REQUIRED` - Premium subscription required
- `RATE_LIMITED` - Rate limit exceeded
- `VALIDATION_ERROR` - Request validation failed

## 🔒 Security

### Rate Limiting
- **Authentication endpoints**: 5 requests per minute
- **API endpoints**: 100 requests per minute
- **Webhook endpoints**: 1000 requests per minute

### CORS Policy
```javascript
{
  origin: ['https://yourdomain.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

### Request Validation
All API endpoints validate:
- Request body schema
- Authentication tokens
- User permissions
- Rate limits

## 📊 Monitoring

### Logging
All API requests are logged with:
- Request ID
- User ID (if authenticated)
- Endpoint
- Response time
- Status code

### Metrics
Key metrics tracked:
- Request count by endpoint
- Response times
- Error rates
- Authentication success/failure rates

---

For questions about the API, please create an issue in the GitHub repository or contact dev@smartats.com.
