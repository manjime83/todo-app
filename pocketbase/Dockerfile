FROM alpine:latest

RUN apk add --no-cache curl jq unzip ca-certificates

RUN export PB_VERSION=$(curl -s https://api.github.com/repos/pocketbase/pocketbase/releases/latest | jq -r .tag_name) && \
    curl -L https://github.com/pocketbase/pocketbase/releases/download/${PB_VERSION}/pocketbase_${PB_VERSION:1}_linux_amd64.zip -o /tmp/pb.zip && \
    unzip -o /tmp/pb.zip pocketbase -d /pb/ && \
    rm /tmp/pb.zip && \
    chmod +x /pb/pocketbase

COPY ./pb_hooks /pb/pb_hooks
COPY ./pb_migrations /pb/pb_migrations
COPY ./pb_public /pb/pb_public

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]