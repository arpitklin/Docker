# nginxApp

To use this Dockerfile:

1. Save your `index.html` file and the Dockerfile in the same directory.
2. Open a terminal.
3. Navigate to the directory containing your `index.html` file and Dockerfile.
4. Build your Docker image with the following command:
   ```bash
   docker build -t my-nginx-container .
   ```
5. After the build completes successfully, run the container with the following command:
   ```bash
   docker run -d -p 8080:80 my-nginx-container
   ```
   This command will start a container named `my-nginx-container` in detached mode (`-d`), mapping port 8080 on your host to port 80 on the container.

Now you should be able to access your static webpage by visiting `http://<DockerIP>:80` in your web browser.
