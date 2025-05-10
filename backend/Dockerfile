FROM golang:latest

WORKDIR /src

# copy all your .go source files
# (or use a .dockerignore and COPY . .)
COPY . .

# remove any previously initialized go.mod and go.sum files
# (this is in case the container data wasn't destroyed)
RUN rm -f go.mod rm go.sum

# initialize Go modules
RUN go mod init stepoutsite

# fetch dependencies
RUN go mod tidy
RUN go mod download

# build (switch to 1 to use the CGO SQLite)
RUN CGO_ENABLED=0 go build -o /stepoutserve

# export listener port
EXPOSE 5000

# run
# (ps. don't forget to mount the pb_data as volume in /pb_data)
CMD ["/stepoutserve", "serve", "--http=0.0.0.0:5000"]