import * as React from 'react';
import * as ReactDOM from 'react-dom';

enum TodoStatus{
	Wait = 1,					// 未完了
	Doit = 2					// 完了
}

interface AppProps{

}
interface AppState{
	todolist: Todo[];
}

interface Todo{
	id: number;
	title: string;
	content: string;
	status: TodoStatus;
}

class App extends React.Component<AppProps, AppState>{
	constructor(props: AppProps){
		super(props);
		this.state = {
			todolist: []
		};
		this.submitClick = this.submitClick.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
		this.doitClick = this.doitClick.bind(this);
		this.notDoitClick = this.notDoitClick.bind(this);
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
			content: document.getElementById('main')!.querySelector<HTMLInputElement>('#content')!.value,
			status: TodoStatus.Wait
		};
		this.setState({
			todolist: this.state.todolist.concat([todo])
		});
	}
	doitClick(id: number){
		const lt = this.state.todolist.map((x) => {
			if(x.id == id){
				x.status = TodoStatus.Doit;
			}
			return x;
		});
		this.setState({
			todolist: lt
		});
	}
	notDoitClick(id: number){
		const lt = this.state.todolist.map((x) => {
			if(x.id == id){
				x.status = TodoStatus.Wait;
			}
			return x;
		});
		this.setState({
			todolist: lt
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
		const list = this.state.todolist.map((x, i)=>{
			if(x.status == TodoStatus.Doit){
				return (
						<li>
						<s>
						{x.title}:{x.content}
					    </s>
						<button onClick={()=>this.notDoitClick(x.id)}>戻す</button>
						<button onClick={()=>this.deleteClick(x.id)}>削除</button>
						</li>
				)
			}else{
				return (
						<li>
						{x.title}:{x.content}
						<button onClick={()=>this.doitClick(x.id)}>完了</button>
						<button onClick={()=>this.deleteClick(x.id)}>削除</button>
						</li>
				);
			}
		});
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
