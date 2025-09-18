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
