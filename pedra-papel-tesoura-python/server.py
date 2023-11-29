import random
from xmlrpc.server import SimpleXMLRPCServer

# Função para jogar Pedra, Papel e Tesoura
def jogar_rps(escolha_do_cliente):
    opcoes = ["pedra", "papel", "tesoura"]
    escolha_do_servidor = random.choice(opcoes)

    if escolha_do_cliente not in opcoes:
        return "Escolha inválida. Escolha entre 'pedra', 'papel' ou 'tesoura'."

    if escolha_do_cliente == escolha_do_servidor:
        return f"Empate! O servidor escolheu {escolha_do_servidor}."

    if (
        (escolha_do_cliente == "pedra" and escolha_do_servidor == "tesoura")
        or (escolha_do_cliente == "papel" and escolha_do_servidor == "pedra")
        or (escolha_do_cliente == "tesoura" and escolha_do_servidor == "papel")
    ):
        return f"Você venceu! O servidor escolheu {escolha_do_servidor}."

    return f"Você perdeu! O servidor escolheu {escolha_do_servidor}."

# Crie um servidor RPC na porta 8000
server = SimpleXMLRPCServer(("localhost", 8000))
server.register_function(jogar_rps, "jogar_rps")

print("Servidor RPC rodando na porta 8000...")
server.serve_forever()
