# Typed Api Responses

How would you model a typed API response so the UI can safely handle success and failure?

weak model:
type ApiResponse<T> = {
data?: T;
error?: string;
};

in some cases we can get a valid 200 response which is an error like in graphql

stronger model:
type ApiResponse<T> = {
status: "success";
data: T
} |
{
status: "error";
error: string
}

I’d separate transport success from application success. A 200 response only tells me the request completed at the HTTP level. It does not always mean the operation succeeded. In GraphQL, for example, a response can contain an errors array even with a 200 status. So I would usually normalize the raw API response into a UI-facing discriminated union like { status: "success", data } or { status: "error", error }. That gives the React component a simple and safe contract.
