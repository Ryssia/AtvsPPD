import xmlrpc.client

# Crie um cliente RPC para se conectar ao servidor
cliente = xmlrpc.client.ServerProxy("http://localhost:8000/")

while True:
    escolha = input("Escolha entre 'pedra', 'papel' ou 'tesoura' (ou 'sair' para encerrar): ").lower()

    if escolha == "sair":
        break

    resultado = cliente.jogar_rps(escolha)
    print(resultado)
