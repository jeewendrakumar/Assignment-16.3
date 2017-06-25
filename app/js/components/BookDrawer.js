import React from "react";
import Relay from "react-relay";
import AddBookMutation from "../mutations/AddBookMutation";

class BookDrawer extends React.Component {
    constructor(){
        super();
        this.state = {
            addBook: "Add Book",
            btnEnabled:false
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const onSuccess = (response) => {
            console.log("Mutation successful!: response: ", response);
            this.closeBookDrawer();
        };
        const onFailure = (transaction) => {
            const error = transaction.getError() || new Error("Mutation failed.");
            console.error(error);
        };

        const {bookStore} = this.props;
        this.setState({addBook:"Adding...", btnEnabled:true});
        const mutation = new AddBookMutation({"title": this.title.value, "author": this.author.value, bookStore});
        setTimeout(() => {
            Relay.Store.commitUpdate(mutation, {onFailure, onSuccess});
            this.setState({addBook:"Add Book", btnEnabled:false});
        }, 2000);
    }

    closeBookDrawer = () => {
        this.props.closeBookDrawer();
    }

    render() {
        const {addBook, btnEnabled} = this.state;
        return (
            <div className="book-drawer">
                <h1>Book</h1>
                <form className="add-book form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" ref={c => this.title = c} className="form-control" id="title" placeholder="New Book"/>
                    </div>
                    <div className="form-group">
                        <input type="text" ref={c => this.author = c} className="form-control" id="title" placeholder="New Author"/>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn" onClick={this.closeBookDrawer}>Cancel</button>
                        <button type="submit" className="btn btn-primary  float-right" disabled={btnEnabled}>{addBook}</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Relay.createContainer(BookDrawer, {
    fragments: {
        bookStore: () => Relay.QL `
            fragment on BookStore{
                id
            }
        `
    }
});
