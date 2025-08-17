# Design Document

## Overview

The medical report generation API will be refactored to provide robust error handling, clean code structure, and reliable JSON parsing. The design focuses on improving the existing POST endpoint at `/api/medical-report` while maintaining backward compatibility with the current client implementation.

## Architecture

The medical report generation follows a simple request-response pattern:

```
Client Request → Input Validation → OpenAI API Call → Response Processing → Database Update → JSON Response
```

### Key Components:
- **Input Validation**: Validate required fields (sessionId, sessionDetail, messages)
- **AI Service Integration**: OpenAI API call with structured prompt
- **Response Parser**: Robust JSON parsing with fallback strategies
- **Database Service**: Update session chat table with generated report
- **Error Handler**: Centralized error handling with appropriate HTTP status codes

## Components and Interfaces

### Request Interface
```typescript
interface MedicalReportRequest {
  sessionId: string;
  sessionDetail: SessionDetail;
  messages: Message[];
}

interface Message {
  role: string;
  text: string;
}
```

### Response Interface
```typescript
interface MedicalReportResponse {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
}

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
```

### Core Functions

1. **validateRequest(req: NextRequest)**: Validates incoming request data
2. **generateAIReport(userInput: string)**: Calls OpenAI API and returns raw response
3. **parseAIResponse(rawResponse: string)**: Robust JSON parsing with cleanup
4. **updateDatabase(sessionId: string, report: MedicalReportResponse)**: Updates database with report
5. **handleError(error: any)**: Centralized error handling

## Data Models

The existing database schema will be maintained:
- **SessionChatTable**: Contains sessionId and report JSON field
- **Report JSON Structure**: Matches the MedicalReportResponse interface

## Error Handling

### Error Categories:
1. **Validation Errors** (400): Missing or invalid request data
2. **AI Service Errors** (502): OpenAI API failures
3. **Parsing Errors** (500): JSON parsing failures
4. **Database Errors** (500): Database operation failures

### Error Response Format:
```typescript
{
  error: "ERROR_TYPE",
  message: "Human readable error message",
  statusCode: number
}
```

### Logging Strategy:
- Log all errors with full context for debugging
- Include request ID for tracing
- Sanitize sensitive data in logs

## Testing Strategy

### Unit Tests:
- Test JSON parsing with various AI response formats
- Test error handling for each failure scenario
- Test database update operations
- Test input validation

### Integration Tests:
- Test full API endpoint with mock OpenAI responses
- Test database integration
- Test error scenarios end-to-end

### Test Data:
- Valid conversation messages
- Malformed AI responses
- Database connection failures
- Invalid request payloads

## Implementation Notes

### JSON Parsing Robustness:
The AI response parsing will implement multiple strategies:
1. Direct JSON.parse() attempt
2. Strip markdown code blocks and retry
3. Extract JSON from mixed content using regex
4. Fallback to structured error response

### Code Cleanup:
- Remove unused imports: `Session` from 'inspector/promises' and `report` from 'process'
- Handle database update result properly
- Remove @ts-ignore comments where possible
- Add proper TypeScript types

### Backward Compatibility:
The API response format will remain unchanged to ensure existing client code continues to work without modifications.