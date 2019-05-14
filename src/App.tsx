import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps{

}
interface AppState{
	todolist: Todo[];
}

interface Todo{
	id: number;
	title: string;
	content: string;
}

class App extends React.Component<AppProps, AppState>{
	constructor(props: AppProps){
		super(props);
		this.state = {
			todolist: []
		};
		this.submitClick = this.submitClick.bind(this)
		this.deleteClick = this.deleteClick.bind(this)
	}
	createNumber(todolist: Todo[]): number{
		if(todolist.length <= 0){
			return 0;
		}else{
			let max: number = 0;
			todolist.forEach((x) => {
				if(max < x.id) max = x.id;
			});
			return max + 1;
		}
	}
	submitClick(){
		const todo: Todo = {
			id: this.createNumber(this.state.todolist),
			title: document.getElementById('main')!.querySelector<HTMLInputElement>('#title')!.value,
			content: document.getElementById('main')!.querySelector<HTMLInputElement>('#content')!.value
		};
		this.setState({
			todolist: this.state.todolist.concat([todo])
		});
	}
	deleteClick(id: number){
		if(window.confirm('削除する？')){
			this.setState({
				todolist: this.state.todolist.filter((x) => x.id != id)
			});
		}
	}
	render(): JSX.Element{
		const list = this.state.todolist.map((x, i)=>(
				<li key={i}><a onClick={() => this.deleteClick(i)}>{x.title}</a></li>
		));
		return(
			<div id="main">
				<p><input type="text" id="title" /></p>
				<p><input type="text" id="content" /></p>
				<p><input type="submit" id="submit" value="作成" onClick={this.submitClick} /></p>
				<ul>
					{list}
				</ul>
			</div>
		);
	}
}
ReactDOM.render(
	<App />,
	document.querySelector('.content'),
);
