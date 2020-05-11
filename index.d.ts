declare module 'get-sport-result' {
  export default {
    options: object,
    get(sport: string, name: string, date: Date, option?: { supplier: string, minRating: number }): Promise<any>
  }
}
