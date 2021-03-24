import { Component } from 'react';

export default class ErrorComponents extends Component {
  render() {
    return (
      <div className="p-8 bg-white min-h-screen overflow-hidden flex justify-center">
        <div className="relative flex justify-center items-center">
          <div className="container pt-20 pb-20 lg:pt-24 lg:pb-24 mx-auto">
            <h1 className="text-4xl lg:text-5xl text-center">
              404 Page Not Found
            </h1>
            <p className="text-center mt-10">
              ❌ You go to a page which no one has ever made
            </p>
          </div>
        </div>
      </div>
    );
  }
}
