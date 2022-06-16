#!groovy


pipeline{
    agent any

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
                    sh "docker push if20b034/conint:$COMMIT_HASH ."
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