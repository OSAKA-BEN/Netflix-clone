declare module 'bcrypt' {
  /**
   * @param {string} data - The data to be encrypted.
   * @param {string|number} saltOrRounds - The salt to be used to hash the password.
   */
  export function hash(
    data: string,
    saltOrRounds: string | number,
  ): Promise<string>

  /**
   * @param {string} data - The data to be compared.
   * @param {string} encrypted - The data to be compared against.
   */
  export function compare(data: string, encrypted: string): Promise<boolean>

  /**
   * @param {number} rounds - The cost of processing the data.
   */
  export function genSalt(rounds?: number): Promise<string>
}
