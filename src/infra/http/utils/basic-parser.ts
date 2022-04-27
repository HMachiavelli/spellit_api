// Authorization: Basic {credenciais em base 64 no formato usuário:senha}

type BasicParserResponse = {
  client_id: string;
  client_secret: string;
};

export interface IBasicParser {
  parse(basicString: string): BasicParserResponse;
}

export class BasicParser {
  parse = (basicString: string): BasicParserResponse => {
    let res: BasicParserResponse = { client_id: null, client_secret: null };

    const parsed = basicString.split(" ")[1] || null;
    if (!parsed) {
      return res;
    }

    const buff = Buffer.from(parsed, "base64");
    const decoded = buff.toString("ascii");

    const splitted = decoded.split(":") || null;
    if (!splitted) {
      return res;
    }

    res.client_id = splitted[0];
    res.client_secret = splitted[1];

    return res;
  };
}
