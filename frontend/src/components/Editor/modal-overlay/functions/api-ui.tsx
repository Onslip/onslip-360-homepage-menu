import { h } from "@stencil/core";
import { GetData } from "../../../utils/get";
import { PostData } from "../../../utils/post";
import { DBConnection, newApi } from "../../../utils/utils";




let Api: newApi = await GetData('http://localhost:8080/api').then(response => response).catch(err => err);



export function renderBody(url) {

    async function UpdateApi() {
        Api = await GetData('http://localhost:8080/api').then(response => response).catch(err => err);
    }

    async function TestData() {
        UpdateApi();
        await PostData(url, Api)

        if (Api?.ApiConnected) {
            location.reload();
        }
    }

    return (
        <div class="modal">
            <div class="header">
                <h6>Ändra api-nyckel</h6>
            </div>
            <div class="body">
                <div>
                    <h3>API: </h3>
                    <div class='inputfield'>
                        <label>API-base: </label>
                        <input type="text" value={Api?.api?.onslip360?.base ?? ''} onInput={(event: any) => { Api.api.onslip360.base = event.target.value; console.log(event.target.value) }} />
                    </div>
                    <div class='inputfield'>
                        <label>API-realm: </label>
                        <input type="text" value={Api?.api?.onslip360?.realm ?? ''} onInput={(event: any) => Api.api.onslip360.realm = event.target.value} />
                    </div>
                    <div class='inputfield'>
                        <label>API-id: </label>
                        <input type="text" value={Api?.api?.onslip360?.id ?? ''} onInput={(event: any) => Api.api.onslip360.id = event.target.value} />
                    </div>
                    <div class='inputfield'>
                        <label>API-nyckel: </label>
                        <input type="text" value={Api?.api?.onslip360?.key ?? ''} onInput={(event: any) => Api.api.onslip360.key = event.target.value} />
                        {!Api?.ApiConnected ? <p>Något fel med API inmatningarna. Kolla så att allt stämmer.</p> : null}
                    </div>
                    <h3>Databas: </h3>
                    <div class='inputfield'>
                        <label>Databas-Uri</label>
                        <input type="text" value={Api?.api?.database?.uri ?? ''} onInput={(event: any) => Api.api.database.uri = event.target.value} />
                        {!Api?.DatabaseConnected && Api?.api?.database?.uri != '' ? <p>Något fel med Databas-Uri</p> : null}
                    </div>
                    <slot />
                    {
                        !DBConnection ? <div class='inputfield'>
                            <p>Lägg till databas-uri för att få tillgång till bilder...</p>
                        </div> : null
                    }
                </div>
            </div>
            <div class="footer">
                <button class='button-save' onClick={TestData.bind(this)} type="submit" value="Submit">Spara</button><button class='button-close'>Avbryt</button>
            </div>
        </div>
    );
}