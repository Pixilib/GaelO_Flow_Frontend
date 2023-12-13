import React from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode,
    FallbackComponent: React.ReactNode
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, Record<string, any>, any> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info);
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.FallbackComponent;
        }

        return this.props.children;
    }
}

export default ErrorBoundary