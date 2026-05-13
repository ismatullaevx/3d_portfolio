import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.group("ErrorBoundary caught an error");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[100px] p-8 text-center bg-primary rounded-xl">
          <h2 className="text-white text-[24px] font-bold mb-4">
            Something went wrong
          </h2>
          <p className="text-secondary text-[16px] mb-6">
            The 3D content couldn't be loaded on this device.
          </p>
          <button
            className="bg-tertiary py-2 px-6 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
