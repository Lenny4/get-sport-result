declare module 'get-sport-result' {
    const module: {
        options: object,
        get(sport: string, name: string, date: Date, option?: { supplier: string, minRating: number }): Promise<any>
    };
    export default module;
}
