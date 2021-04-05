#! /bin/bash

# Push only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "main" ] ; then
        docker-deploy/ecs.sh -c $LIVE_CLUSTER_NAME -n $LIVE_SERVICE -i "$AWS_URL/$LIVE_APP_NAME:latest" -r YOUR-AWS-REGION -t 240
    fi
fi
