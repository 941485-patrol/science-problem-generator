import React, { Component } from "react";

interface HeaderProps {
  title: any;
}

export default class Header extends Component<HeaderProps> {
  render() {

    return (
      <>
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          {this.props.title}
        </h1>
      </>
    );
  }
}
