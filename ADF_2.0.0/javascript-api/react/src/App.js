import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as AlfrescoApi from 'alfresco-js-api';

class App extends Component {

    constructor(props) {
        super(props);

        this.alf = new AlfrescoApi({
            hostEcm: 'http://localhost:8888',
            hostBpm: 'http://localhost:8888',
            provider: 'ALL'
        });

        this.state = {
            tasks: [],
            files: []
        };
    }

    componentDidMount() {
        this.login();
    }

    login(){
        this.alf.login('admin', 'admin').then(data => {
                console.log('API called successfully Login in performed ', data);

                this.getTasks();

                this.getFiels();
            },
            error => {
                console.log('Error', error);
            }
        );
    }

    getFiels() {
        this.alf.core.nodesApi.getNodeChildren('-my-').then(data => {
                console.log('requestNodes ', data);
                this.setState({files: data.list.entries});
            },
            error => {
                console.log('Error', error);
            });
    }

    getTasks() {
        var requestTasks = new this.alf.activiti.TaskQueryRequestRepresentation();

        this.alf.activiti.taskApi.listTasks(requestTasks).then(data => {
                console.log('listTasks ', data);
                this.setState({tasks: data.data});
            },
            error => {
                console.log('Error', error);
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <div align="center"><b>Tasks</b></div>
                <table align="center" border={1}>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                    {this.state.tasks.map(task =>
                        <tr>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                        </tr>
                    )}
                </table>

                <br></br><br></br><br></br>

                <div align="center"><b>Files</b></div>
                <table align="center" border={1}>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                    {this.state.files.map(file =>
                        <tr>
                            <td>{file.entry.id}</td>
                            <td>{file.entry.name}</td>
                        </tr>
                    )}
                </table>
            </div>
        );
    }
}

export default App;
