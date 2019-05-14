import * as React from 'react';
import * as ReactDOM from 'react-dom';

enum TodoStatus{
	Wait = 1,					// 未完了
	Doit = 2,					// 完了
	Updating = 3				// 更新中
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
		this.editClick = this.editClick.bind(this);
		this.updatedClick = this.updatedClick.bind(this);
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
		this.changeState(id, TodoStatus.Doit);
	}
	notDoitClick(id: number){
		this.changeState(id, TodoStatus.Wait);
	}
	deleteClick(id: number){
		if(window.confirm('削除する？')){
			this.setState({
				todolist: this.state.todolist.filter((x) => x.id != id)
			});
		}
	}
	editClick(id: number){
		this.changeState(id, TodoStatus.Updating);
	}
	changeState(id: number, status: TodoStatus){
		const lt = this.state.todolist.map((x) => {
			if(x.id == id){
				x.status = status;
			}
			return x;
		});
		this.setState({
			todolist: lt
		});
	}
	updatedClick(id: number){
		const title = document.getElementById('main')!.querySelector<HTMLInputElement>('#edit_title_' + id)!.value;
		const content = document.getElementById('main')!.querySelector<HTMLInputElement>('#edit_content_' + id)!.value;
		const lt = this.state.todolist.map((x) => {
			if(x.id == id){
				x.status = TodoStatus.Wait;
				x.title = title;
				x.content = content;
			}
			return x;
		});
		this.setState({
			todolist: lt
		});
	}
	render(): JSX.Element{
		const list = this.state.todolist.map((x, i)=>{
			if(x.status == TodoStatus.Doit){
				return (
						<li key={i}>
						<s>
						{x.title}:{x.content}
					    </s>
						<button onClick={()=>this.notDoitClick(x.id)}>戻す</button>
						<button onClick={()=>this.deleteClick(x.id)}>削除</button>
						</li>
				)
			}else if(x.status == TodoStatus.Wait){
				return (
						<li key={i}>
						{x.title}:{x.content}
						<button onClick={()=>this.doitClick(x.id)}>完了</button>
						<button onClick={()=>this.editClick(x.id)}>更新</button>
						<button onClick={()=>this.deleteClick(x.id)}>削除</button>
						</li>
				);
			}else{
				return (
						<li key={i}>
						<input type="text" id={"edit_title_" + x.id} defaultValue={x.title} />
						<input type="text" id={"edit_content_" + x.id} defaultValue={x.content} />
						<button onClick={()=>this.updatedClick(x.id)}>編集完了</button>
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
