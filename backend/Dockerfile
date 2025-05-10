FROM golang:1.22

# Set destination for COPY
WORKDIR /app

# Download Go modules
# COPY go.mod go.sum ./
# RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy
# COPY *.go ./

# Copy source code before creating go.mod
COPY . .

# Initialize Go module (only if go.mod does not exist)
RUN go mod init stepoutsite && go mod tidy


# # Now copy the full source code (preserving structure)
# COPY . .

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -o /stepoutserve

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose
EXPOSE 5000

# Run
CMD ["/stepoutserve"]