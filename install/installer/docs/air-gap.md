# Installing Devpod in an air-gap network with the Devpod Installer

## Mirror Devpod Images

You need a registry that is reachable in your network. Add the domain of your registry to the Devpod config `devpod.config.yaml` like this:
```yaml
repository: your-registry.example.com
```

The command `devpod-installer mirror list` gives you a list of all images needed by Devpod. You can run the following code to pull the needed images and push them to your registry:

```
for row in $(devpod-installer mirror list --config devpod.config.yaml | jq -c '.[]'); do
    original=$(echo $row | jq -r '.original')
    target=$(echo $row | jq -r '.target')

    docker pull $original
    docker tag $original $target
    docker push $target
done
```

## Install Devpod in Air-Gap Mode

To install Devpod in an air-gap network, you need to configure the repository of the images needed by Devpod (see previous step). Add this to your Devpod config:

```yaml
repository: your-registry.example.com
```

That's it. Run the following commands as usual and Devpod fetches the images from your registry and does not need internet access to operate:

```
devpod-installer render --config devpod.config.yaml > devpod.yaml
kubectl apply -f devpod.yaml
```
