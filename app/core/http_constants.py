class HttpConstants:

    class HttpResponse:
        UNHANDLED_EXCEPTION = "Sorry something went wrong :("

    class HttpStatusMessages:
        OK                    = "Success"
        NO_CONTENT            = "Operation successful with no content return"
        BAD_REQUEST           = "The request was invalid"
        UNAUTHORIZED          = "Unauthorized access"
        FORBIDDEN             = "Forbidden access"
        NOT_FOUND             = "The requested resource was not found"
        CONFLICT              = "Resource already exists"
        INTERNAL_SERVER_ERROR = "An internal server error occurred"
        UNKNOWN               = "Unknown status code"

    class HttpResponseCodes:
        OK                    = 200
        CREATED               = 201
        NO_CONTENT            = 204
        BAD_REQUEST           = 400
        UNAUTHORIZED          = 401
        FORBIDDEN             = 403
        NOT_FOUND             = 404
        CONFLICT              = 409
        INTERNAL_SERVER_ERROR = 500