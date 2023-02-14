import { MakeEventSerializer } from "@ddd-ts/event-sourcing/dist/event/event-serializer";
import { Serializer, Serialized } from "@ddd-ts/model";
import { AccountId } from "../domain/write/account/account-id";
import {
  Transfer,
  TransferAmountClaimed,
  TransferInitiated,
} from "../domain/write/transfer/transfer";

export class TransferSerializer extends Serializer<Transfer> {
  async serialize(model: Transfer) {
    return {
      id: model.id.toString(),
      from: model.from.toString(),
      to: model.to.toString(),
      amount: model.amount,
      amountClaimed: model.amountClaimed,
    };
  }

  async deserialize(serialized: Serialized<this>) {
    return Transfer.deserialize(
      serialized.id,
      AccountId.deserialize(serialized.from),
      AccountId.deserialize(serialized.to),
      serialized.amount,
      serialized.amountClaimed
    );
  }

  getIdFromModel(model: Transfer) {
    return model.id;
  }

  getIdFromSerialized(serialized: Serialized<this>) {
    return serialized.id;
  }
}

export class TransferInitiatedSerializer extends MakeEventSerializer(
  TransferInitiated
) {
  async serializePayload(payload: TransferInitiated["payload"]) {
    return {
      transferId: payload.transferId,
      from: payload.from.toString(),
      to: payload.to.toString(),
      amount: payload.amount,
    };
  }

  async deserializePayload(serialized: any) {
    return {
      transferId: serialized.transferId,
      from: AccountId.deserialize(serialized.from),
      to: AccountId.deserialize(serialized.to),
      amount: serialized.amount,
    };
  }
}

export class TransferAmountClaimedSerializer extends MakeEventSerializer(
  TransferAmountClaimed
) {
  async serializePayload(payload: TransferAmountClaimed["payload"]) {
    return {
      transferId: payload.transferId,
    };
  }

  async deserializePayload(serialized: any) {
    return {
      transferId: serialized.transferId,
    };
  }
}
