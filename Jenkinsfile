#!groovy


pipeline{
    agent any

    // tools {nodejs "nodejs"}

    options{
        disableConcurrentBuilds()
        timeout(time:5,unit:'MINUTES')
    }

    environment{
        NODE_ENV="production"
    }

    stages{
        stage("SETUP"){
            steps{
                script{
                    COMMIT_HASH= sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    COMMIT_HASH_PREV_2 = sh(script:"git rev-parse --short HEAD~2", returnStdout:true).trim()
                }
            }
        }
        stage("BUILD"){
            steps{
                script{
                   sh "docker build -t if20b034/conint:$COMMIT_HASH ."
                }
            }
        }
        stage("RUN"){
            agent{
                docker{
                    image "if20b034/conint:$COMMIT_HASH"     
                }
            }
            stages{
                stage("INSTALL"){
                    steps{
                        script {
                            sh "npm ci --also=dev"
                        }
                    }
                }
                stage("LINT"){
                    steps {
                        script {
                            sh "npm run lint"
                        }
                    }
                }
                stage("TEST"){
                    steps{
                        script{
                            sh "npm run test"
                        }
                    }
                }
            }
        }
        stage("DEPLOY"){
            steps{
                script{
                    // BUILT_TAG=sh(script:"docker images --quiet", returnStdout: true).trim()
                    sh "docker logout"
                    sh "docker login --password 7d9bd3de-8577-4d4c-b1f7-34b3a8173b69 --username if20b034"
                    sh "docker tag if20b034/conint:$COMMIT_HASH if20b034/conint:$COMMIT_HASH"
                    sh "docker push if20b034/conint:$COMMIT_HASH"
                }
            }
        }
    }


    post {
        always{
            sh "docker image rm if20b034/conint:$COMMIT_HASH_PREV_2"
            cleanWs()
        }
    }
}