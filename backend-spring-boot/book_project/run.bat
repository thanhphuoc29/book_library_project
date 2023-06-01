@ECHO OFF
java -server -jar -Dfile.encoding=UTF-8 -Xms1000M -Xmx1000M target\project.jar
PAUSE