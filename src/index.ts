const BASE_URL = `https://kitsu.io/api/edge`;

type Pagination = {
  limit: number;
  offset: number;
};

interface IAnimeClient {
  getBestRanking(data: Pagination): Promise<any>; // top animes
  getByCategory(): Promise<any>; // with pagination
  getDetails(id: number): Promise<any>; // will need id from other get
  getWorstRanking(): Promise<any>; // bottom animes
}

export class AnimeClient implements IAnimeClient {
  private validateLimitOffset(data: Pagination) {
    if (data.limit < 1 || data.limit > 100) {
      throw new Error("Limit must be between 1 and 20");
    }

    return `page[limit]=${data.limit}&page[offset]=${data.offset}`;
  }

  public async getBestRanking(data: Pagination) {
    const validatedParams = this.validateLimitOffset(data);
    const urlParams = new URLSearchParams(validatedParams).toString();

    try {
      const response = await fetch(`${BASE_URL}/anime?${urlParams}`, {
        method: "GET",
      });

      const res = await response.json();

      return res.data;
    } catch (err) {
      this._handleError(err);
    }
  }

  public async getByCategory() {}

  public async getDetails() {}

  public async getWorstRanking() {}

  _handleError(err: any) {
    console.log(err);

    /*
    if (err.response) {
      throw new Error(
        `MAL API retornou status ${err.response.status}: ${JSON.stringify(
          err.response.data
        )}`
      );
    } else {
      throw err;
    }*/
  }
}

export default AnimeClient;
