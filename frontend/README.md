Só um lembrete importante: sempre que alterar o schema.prisma, rode esse comando de dentro do frontend para regenerar o client:

.\node_modules\.bin\prisma generate --schema=..\prisma\schema.prisma
