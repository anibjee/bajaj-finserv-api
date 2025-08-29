# Bajaj Finserv REST API

## Overview
A REST API that processes an array of mixed data types and returns categorized results including numbers, alphabets, and special characters.

## API Endpoint
- **Method**: POST
- **Route**: `/bfhl`
- **Content-Type**: `application/json`

## Request Format
```json
{
  "data": ["array", "of", "mixed", "values"]
}
```

## Response Format
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1", "5"],
  "even_numbers": ["2", "4"],
  "alphabets": ["A", "B"],
  "special_characters": ["$", "&"],
  "sum": "12",
  "concat_string": "BaA"
}
```

## Local Development

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The API will be available at `http://localhost:3000/bfhl`

### Testing
Test the API using PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/bfhl" -Method Post -ContentType "application/json" -Body '{"data": ["a","1","334","4","R", "$"]}'
```

## Deployment to Render.com

### Steps:
1. Create a new account on [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Deploy the service

### Important Notes:
- Make sure to update the personal details in `server.js`:
  - Replace `user_id` with your name and birthdate
  - Replace `email` with your actual email
  - Replace `roll_number` with your college roll number

## API Logic

### Data Processing:
1. **Numbers**: Separated into odd and even arrays (returned as strings)
2. **Alphabets**: Converted to uppercase
3. **Special Characters**: Non-alphanumeric characters
4. **Sum**: Sum of all numeric values (returned as string)
5. **Concatenation**: All alphabets in reverse order with alternating capitalization

### Error Handling:
- Invalid input validation
- Graceful error responses
- Proper HTTP status codes

## Examples

### Example A
**Request:**
```json
{"data": ["a","1","334","4","R", "$"]}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```
