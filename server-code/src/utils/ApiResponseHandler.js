class ApiResponse {
  constructor(message, statusCode, data) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  handleResponse(res) {
    res.status(this.statusCode).json({
      message: this.message,
      data: this.data,
    });
  }
}

export { ApiResponse };
