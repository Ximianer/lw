FROM ubuntu:latest

# Avoid prompts during build
ENV DEBIAN_FRONTEND=noninteractive

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Hugo
RUN wget -q https://github.com/gohugoio/hugo/releases/download/v0.121.2/hugo_0.121.2_linux-amd64.deb && \
    apt-get update && apt-get install -y ./hugo_0.121.2_linux-amd64.deb && \
    rm hugo_0.121.2_linux-amd64.deb && \
    rm -rf /var/lib/apt/lists/*

# Verify installations
RUN hugo version && git --version

# Set working directory
WORKDIR /workspace

# Keep container running
CMD ["/bin/bash"]
