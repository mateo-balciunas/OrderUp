export const swaggerDefinition = {
    "openapi": "3.0.0",
    "info": {
        "title": "OrderUp API",
        "version": "1.0.0",
        "description": "OrderUp API Documentation"
    },
    "servers": [
        {
            "url": "http://localhost:3000",
            "description": "Local Development Server"
        }
    ],
    "paths": {
        "/api/v1/auth/login": {
            "post": {
                "summary": "User Login",
                "tags": ["Auth"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": { "type": "string" },
                                    "password": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Login successful" }
                }
            }
        },
        "/api/v1/auth/current-user": {
            "get": {
                "summary": "Get Current User",
                "tags": ["Auth"],
                "responses": {
                    "200": { "description": "Get current user successful" }
                }
            }
        },
        "/api/v1/auth/register": {
            "post": {
                "summary": "User Registration",
                "tags": ["Auth"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "email": { "type": "string" },
                                    "name": { "type": "string" },
                                    "password": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "Registration successful" },
                    "400": { "description": "Bad Request" }
                }
            }
        },
        "/api/v1/{organizationId}/channels": {
            "post": {
                "summary": "Create Channel",
                "tags": ["Channel"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "channelType": { "type": "string" },
                                    "name": { "type": "string" },
                                    "config": { "type": "object" },
                                    "isActive": { "type": "boolean" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Channel created successfully" },
                    "404": { "description": "Organization not found" }
                }
            },
            "get": {
                "summary": "List Channels",
                "tags": ["Channel"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": { "description": "Channels retrieved successfully" },
                    "404": { "description": "Organization not found" }
                }
            }
        },
        "/api/v1/{organizationId}/channels/{channelId}": {
            "get": {
                "summary": "Get Channel",
                "tags": ["Channel"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "channelId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": { "description": "Channel retrieved successfully" },
                    "404": { "description": "Organization or Channel not found" }
                }
            },
            "put": {
                "summary": "Update Channel",
                "tags": ["Channel"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "channelId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "channelType": { "type": "string" },
                                    "name": { "type": "string" },
                                    "config": { "type": "object" },
                                    "isActive": { "type": "boolean" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Channel updated successfully" },
                    "404": { "description": "Organization or Channel not found" }
                }
            },
            "delete": {
                "summary": "Delete Channel",
                "tags": ["Channel"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "channelId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "204": { "description": "Channel deleted successfully" },
                    "404": { "description": "Organization or Channel not found" }
                }
            }
        },
        "/api/v1/memberships": {
            "post": {
                "summary": "Create Membership",
                "tags": ["Membership"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "userId": { "type": "string" },
                                    "organizationId": { "type": "string" },
                                    "role": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "Membership created successfully" },
                    "404": { "description": "Organization or User not found" }
                }
            },
            "get": {
                "summary": "List Memberships",
                "tags": ["Membership"],
                "responses": {
                    "200": { "description": "Memberships retrieved successfully" },
                    "404": { "description": "Organization not found" }
                }
            }
        },
        "/api/v1/memberships/{membershipId}": {
            "get": {
                "summary": "Get Membership",
                "tags": ["Membership"],
                "parameters": [
                    {
                        "name": "membershipId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "Membership retrieved successfully" },
                    "404": { "description": "Membership not found" }
                }
            },
            "put": {
                "summary": "Update Membership",
                "tags": ["Membership"],
                "parameters": [
                    {
                        "name": "membershipId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "role": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Membership updated successfully" },
                    "404": { "description": "Membership not found" }
                }
            },
            "delete": {
                "summary": "Delete Membership",
                "tags": ["Membership"],
                "parameters": [
                    {
                        "name": "membershipId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "204": { "description": "Membership deleted successfully" },
                    "404": { "description": "Membership not found" }
                }
            }
        },
        "/api/v1/{organizationId}/orders": {
            "post": {
                "summary": "Create Order",
                "tags": ["Order"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "externalRef": { "type": "string" },
                                    "channelId": { "type": "string" },
                                    "status": { "type": "string" },
                                    "metadata": { "type": "object" },
                                    "priority": { "type": "number" },
                                    "lines": {
                                        "type": "array", 
                                        "items": {
                                            "type": "object", 
                                            "properties": {
                                                "sku": { "type": "string" },
                                                "quantity": { "type": "number" },
                                                "unit": { "type": "string" },
                                                "unitPrice": { "type": "number" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "Order created successfully" },
                    "404": { "description": "Organization or Channel not found" }
                }
            },
            "get": {
                "summary": "List Orders",
                "tags": ["Order"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "Orders retrieved successfully" },
                    "404": { "description": "Organization not found" }
                }
            }
        },
        "/api/v1/{organizationId}/orders/{orderId}": {
            "get": {
                "summary": "Get Order",
                "tags": ["Order"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "orderId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "Order retrieved successfully" },
                    "404": { "description": "Organization or Order not found" }
                }
            },
            "put": {
                "summary": "Update Order",
                "tags": ["Order"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "orderId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "status": { "type": "string" },
                                    "metadata": { "type": "object" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Order updated successfully" },
                    "404": { "description": "Organization or Order not found" }
                }
            },
            "delete": {
                "summary": "Delete Order",
                "tags": ["Order"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "orderId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "204": { "description": "Order deleted successfully" },
                    "404": { "description": "Organization or Order not found" }
                }
            }
        },
        "/api/v1/organizations": {
            "post": {
                "summary": "Create Organization",
                "tags": ["Organization"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "plan": { "type": "string", "enum": ["basic", "pro"] }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "Organization created successfully" },
                    "400": { "description": "Bad Request" }
                }
            },
            "get": {
                "summary": "List Organizations",
                "tags": ["Organization"],
                "responses": {
                    "200": { "description": "Organizations retrieved successfully" },
                    "404": { "description": "No organizations found" }
                }
            }
        },
        "/api/v1/organizations/{organizationId}": {
            "get": {
                "summary": "Get Organization",
                "tags": ["Organization"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "Organization retrieved successfully" },
                    "404": { "description": "Organization not found" }
                }
            },
            "put": {
                "summary": "Update Organization",
                "tags": ["Organization"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "plan": { "type": "string", "enum": ["basic", "pro"] }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "Organization updated successfully" },
                    "404": { "description": "Organization not found" }
                }
            },
            "delete": {
                "summary": "Delete Organization",
                "tags": ["Organization"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "204": { "description": "Organization deleted successfully" },
                    "404": { "description": "Organization not found" }
                }
            }
        },
        "/api/v1/{organizationId}/users": {
            "post": {
                "summary": "Create User",
                "tags": ["User"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "email": { "type": "string" },
                                    "password": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "201": { "description": "User created successfully" },
                    "404": { "description": "Organization or User not found" }
                }
            },
            "get": {
                "summary": "List Users",
                "tags": ["User"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "Users retrieved successfully" },
                    "404": { "description": "Organization not found" }
                }
            }
        },
        "/api/v1/{organizationId}/users/{userId}": {
            "get": {
                "summary": "Get User",
                "tags": ["User"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "200": { "description": "User retrieved successfully" },
                    "404": { "description": "Organization or User not found" }
                }
            },
            "put": {
                "summary": "Update User",
                "tags": ["User"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "name": { "type": "string" },
                                    "email": { "type": "string" },
                                    "password": { "type": "string" }
                                }
                            }
                        }
                    }
                },
                "responses": {
                    "200": { "description": "User updated successfully" },
                    "404": { "description": "Organization or User not found" }
                }
            },
            "delete": {
                "summary": "Delete User",
                "tags": ["User"],
                "parameters": [
                    {
                        "name": "organizationId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    },
                    {
                        "name": "userId",
                        "in": "path",
                        "required": true,
                        "schema": { "type": "string" }
                    }
                ],
                "responses": {
                    "204": { "description": "User deleted successfully" },
                    "404": { "description": "Organization or User not found" }
                }
            }
        }
    }
};