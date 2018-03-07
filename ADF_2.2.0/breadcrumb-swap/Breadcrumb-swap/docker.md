
## Publishing to Docker Hub

First of all, if you do not have a Docker Hub account, you can register here: https://hub.docker.com/, the registration is absolutely free.

Next, it is recommended that you get a clean build of the application:

```sh
npm install
npm run build
```

The commands above are going to produce a fresh build that is stored in the `dist` folder.
At this point, you can make modifications to the final code in the `dist` folder if needed.
For example you may want to change the `app.config.json` file content.

Now you can build your first version of the image:

```sh
docker image build -t myaccount/my_app_name:1.0 .
```

Where `myaccount` is usually your Docker Hub account name.

<p class="warning">
Please note the ending "." symbol at the end of the command. It instructs the Docker to take current folder where the `Dockerfile` is located.
</p>

To publish the newly created image use the next command:

```sh
docker push myaccount/my_app_name:1.0
```

## Running from Docker Hub

To quickly test the published image, or run it on another machine, use the following command:

```sh
docker container run -p 80:80 --rm myaccount/my_app_name:1.0
```

The `--rm` switch means the Docker will cleanup the container and image data once you stop the process.

<p class="tip">
You may also want to remove your local image before trying out the Docker Hub:<br>
`docker image rm myaccount/my_app_name:1.0`
</p>

## Travis

In order to let Travis publish the image to a registry for you uncomment the relative part in the `.travis.yml`.
The email, username, and password used for login should be stored in the repository settings environment variables, which may be set up through the web or locally via the Travis CLI, e.g.:

```
travis env set DOCKER_USERNAME myusername
travis env set DOCKER_PASSWORD secretsecr
```

For more information [see also Pushing a Docker Image to a Registry ](https://docs.travis-ci.com/user/docker/)

