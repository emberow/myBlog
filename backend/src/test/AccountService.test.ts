import * as AccountService from '../services/AccountService';
import * as AccountModel from '../model/AccountModel';
import { Account } from '../entity/Account';
import { UpdateResult } from 'typeorm';

describe('AccountService', () => {
    it('verifyAccount', async () => {
        jest.spyOn(AccountModel, 'verifyAccount')
            .mockImplementation(async () => true);
        const result = await AccountService.verifyAccount("userName", "password");
        expect(result != null).toBe(true);
    });

    it('addAccount', async () => {
        const account: Promise<Account> = Promise.resolve(new Account());
        jest.spyOn(AccountModel, 'isAccountExist')
            .mockImplementation(() => null);
        jest.spyOn(AccountModel, 'addAccount')
            .mockImplementation(() => account);
        const result = await AccountService.addAccount("userName", "password");
        expect(result).toBe(await account);
    });

    it('changePassword', async () => {
        const updateResult: Promise<UpdateResult> = Promise.resolve(new UpdateResult());
        jest.spyOn(AccountModel, 'verifyAccount')
            .mockImplementation(async () => true);
        jest.spyOn(AccountModel, 'changePassword')
            .mockImplementation(() => updateResult);
        const result = await AccountService.changePassword("userName", "password", "newPassword");
        expect(result).toBe(await updateResult);
    });
});
