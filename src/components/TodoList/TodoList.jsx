import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import { getTodos } from '../../api/api';
import { Todo } from '../Todo/Todo';

export class TodoList extends React.Component {
  state = {
    todos: [],
    select: '',
  }

  async componentDidMount() {
    this.setState({ todos: await getTodos() });
  }

  handleSearchUSer = async(event) => {
    const { value } = event.target;
    let todos = await getTodos();

    todos = todos.filter(todo => ((todo.title !== null)
      ? todo.title.includes(value)
      : null));

    this.setState({ todos });
  }

  handleSelect = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });

    return this.selectCategory(value);
  }

  selectCategory = async(select) => {
    const todos = await getTodos();

    if (select === 'completed') {
      return this.setState({ todos: todos.filter(
        todo => !todo.completed,
      ) });
    }

    if (select === 'active') {
      return this.setState({ todos: todos.filter(
        todo => todo.completed,
      ) });
    }

    return this.setState({ todos });
  }

  render() {
    const { todos, select } = this.state;

    return (
      <div className="TodoList">
        <h2>Todos:</h2>
        <>
          <input
            className="input is-rounded"
            type="text"
            placeholder="type title here"
            onChange={this.handleSearchUSer}
          />
          <div className="select is-rounded">
            <select
              name="selectValue"
              value={select}
              onChange={this.handleSelect}
            >
              <option>all</option>
              <option>active</option>
              <option>completed</option>
            </select>
          </div>
        </>
        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {todos.map(todo => (
              <Todo
                todo={todo}
                selectUser={this.props.selectUser}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  selectUser: PropTypes.func.isRequired,
};
