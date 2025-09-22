# Гайд на деплой 2 лабораторной работы по вебу.

Прежде всего, нужно дополнить build.gradle, потому что требуется формат .war при сборке.

````groovy
plugins {
    id 'java'
    id 'war'
}

...

war {
    archiveFileName = 'ROOT.war'
}
````

Вся ваша статика должна храниться по пути `src/main/webapp`

## Локальное тестирование через Docker

Для теста на локалке нужно запустить контейнер.

### Dockerfile

```dockerfile
FROM gradle:8.10-jdk17 AS build

COPY --chown=gradle:gradle .. /home/gradle/src
WORKDIR /home/gradle/src

RUN gradle clean build --no-daemon

FROM quay.io/wildfly/wildfly:28.0.0.Final-jdk17

ENV ADMIN_USER=1
ENV ADMIN_PASSWORD=1
RUN $JBOSS_HOME/bin/add-user.sh -u ${ADMIN_USER} -p ${ADMIN_PASSWORD} --silent

COPY --chown=jboss:jboss --from=build /home/gradle/src/build/libs/*.war \
    $JBOSS_HOME/standalone/deployments/ROOT.war


CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
```

Скачайте Dockerfile и положите его в корень папки с лабой.

## Запуск

Для того, чтобы собрать образ или же обновить его, если внесли какие-то изменения в код, используйте:

```bash
docker build -t lab2-wildfly . 
```

Для запуска контейнера:

```bash
docker run --rm -p 8080:8080 -p 9990:9990 lab2-wildfly
```

После выполнения этой команды, должен стать доступен :8080 порт с лабой. 
Также доступна админ панель на порте :9990.

```
Login: 1
Password: 1
```
