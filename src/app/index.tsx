import { useState } from "react";
import { Button, FlatList, ListRenderItem, StyleSheet, Text, TextInput, View } from "react-native";


interface Produto {
	nome: string;
	preco: number;
	dataCadastro: string;
}


export default function Index() {

	const [tela, setTela] = useState<'lista' | 'cadastro'>('lista')
	const [produtos, setProdutos] = useState<Produto[]>([])

	const salvarProduto = (novoProduto: Produto) => {
		setProdutos(produtos => [...produtos, novoProduto])
		console.log(produtos)
	}

	return (
		<View style={styles.container}>
			{tela === 'lista' ? (
				<TelaLista 
					irCadastro={() => setTela('cadastro')}
					produtos={produtos}>

				</TelaLista>
			) : (
				<TelaCadastro
					voltarLista={() => setTela('lista')}
					addProduto={(produto: Produto) => salvarProduto(produto)}
				>
				</TelaCadastro>
			)}
		</View>
	);
}

interface TelaCadastroProps {
	voltarLista: () => void;
	addProduto: (produto: Produto) => void
}

function TelaCadastro(
	{ voltarLista, addProduto }: TelaCadastroProps
) {

	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState<number>(0);



	const handleChangeNomeProduto = (nome: string) => {
		setNome(nome);
	}

	const handleChangePrecoProduto = (preco: string) => {

		setPreco(Number(preco))
	}


	const handleCriarProduto = (nome: string, preco: number) => {

		const today: Date = new Date();

		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0');
		const yyyy = today.getFullYear();
		const formatted = `${dd}/${mm}/${yyyy}`;

		const produto = {
			nome: nome,
			preco: preco,
			dataCadastro: formatted
		} as Produto

		addProduto(produto)
	}


	return (
		<View>
			<Text style={styles.textTitle}>
				Cadastrar - Item Compra
			</Text>

			<View style={styles.formProduto}>
				<Text style={styles.textLabel}>Produto:</Text>
				<TextInput
					style={styles.inputText}
					onChangeText={e => handleChangeNomeProduto(e)}
				>
				</TextInput>

				<Text style={styles.textLabel}>Preco:</Text>
				<TextInput
					style={styles.inputText}
					onChangeText={e => handleChangePrecoProduto(e)}
				></TextInput>
			</View>

			<View style={styles.botao}>
				<Button
					title="Cadastrar Item"
					color={'green'}
					onPress={() => handleCriarProduto(nome, preco)}
				>
				</Button>
			</View>

			<View>
				<Button
					title="Visualizar Lista"
					color={'blue'}
					onPress={voltarLista}
				>
				</Button>
			</View>
		</View>
	)
}

interface TelaListProps {
	irCadastro: () => void;
	produtos: Produto[];
}

function TelaLista({ irCadastro, produtos }: TelaListProps) {

	const renderProdutos: ListRenderItem<Produto> = ({item}) => (
		<View style={styles.itens}>
			<Text>Nome: {item.nome}</Text>
			<Text>Preço: {item.preco}</Text>
			<Text>Data Cadastro: {item.dataCadastro}</Text>
		</View>
	)

	return (
		<View>
			<Text style={styles.textTitle}>
				Lista de Itens
			</Text>
			<FlatList data={produtos} renderItem={renderProdutos}></FlatList>
			<View>
				<Button
					title="Cadastrar mais Itens"
					color={"blue"}
					onPress={irCadastro}>
				</Button>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		height: '100%',
		margin: 10,
		borderWidth: 1,
		padding: 10
	},
	formProduto: {
		marginBottom: 30
	},
	textTitle: {
		borderWidth: 1,
		borderColor: 'red',
		fontSize: 25,
		alignItems: "center",
		textAlign: 'center',
		fontWeight: 800,
		marginBottom: 30,
	},
	textLabel: {
		fontSize: 20
	},
	inputText: {
		borderWidth: 1,
		width: '50%'
	},
	produto: {
		fontSize: 16,
		fontWeight: 400,
	},
	botao: {
		marginBottom: 10
	},
	itens: {
		borderWidth: 5,
		borderColor: 'blue',
		margin: 10
	}
	
});

