Para instalar ChagasApp:

- Baixe o app;
- Abra o terminal (Bash, CMD, Powershel,...);
- No terminal vá para pasta do app (cd "local da pasta do app");
- Execute " npm install ";
- Execute  " npm start "; 
- Selecione o modo para rodar o app (a = Android, w = Web);

Possíveis soluções caso tenha problemas na instalação e execução (vá para a pasta do app no terminal):
- " rm -rf node_modules package-lock.json " para apagar pastas e arquivos para nova instalação de dependências;
- Para atualizar dependências:
    npm install -g npm-check-updates
    npx npm-check-updates
    npx npm-check-updates -u
- " npm install --legacy-peer-deps " ou " npm install --force "caso não esta instalando dependências;
- " npx expo start " caso esteja iniciando o app;
