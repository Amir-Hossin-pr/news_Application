export default function pipeLine(context: any, middleware: any, index: any) {
    const nextMiddleware = middleware[index];
    if (!nextMiddleware) {
        return context.next;
    }

    return () => {
        const nextPipeLine = pipeLine(context, middleware, index + 1);
        nextMiddleware({
            ...context,
            next: nextPipeLine
        })
    }
}