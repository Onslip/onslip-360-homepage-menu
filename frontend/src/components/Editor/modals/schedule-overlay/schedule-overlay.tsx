import { Component, Host, h, State } from '@stencil/core';
import { MenuWithCategory } from '../../../utils/utils';

@Component({
  tag: 'schedule-overlay',
  styleUrl: 'schedule-overlay.css',
  shadow: true,
})
export class ScheduleOverlay {
  @State() menus: MenuWithCategory[]
  @State() LocationList;
  @State() StartTime
  @State() DaysOfWeek: string[] = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
  @State() Hours: string[] = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

  async componentWillLoad() {
    const menu = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component');
    const toolbar = document.querySelector('editor-visual-check').shadowRoot.querySelector('toolbar-component');
    this.menus = await menu?.GetMenu();
    this.LocationList = await toolbar?.GetLocations();
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  SelectTime(ev) {
    ev.target.style.backgroundColor = 'Red'
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  async Save() {

  }

  render() {
    return (
      <div class="modal">
        <div class="header">
          <ion-col>
            <ion-row>
              <ion-title class="title">Schema för plats och meny</ion-title>
            </ion-row>
            <ion-row>
              <ion-item class='row'>
                <ion-select value={''} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Plats'>
                  {this.LocationList.locations.map(x => <ion-select-option value={x}>{x}</ion-select-option>)}
                </ion-select>
              </ion-item>
              <ion-item class='row'>
                <ion-select value={''} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Meny'>
                  {this.menus.map(x => <ion-select-option value={x}>{x.menu.name}</ion-select-option>)}
                </ion-select>
              </ion-item>
            </ion-row>

          </ion-col>
        </div>
        <div class="body">

          <div class="content">
            <ion-row class='HeaderRow'>
              <table class='HeaderTable'>
                <tbody>
                  <tr class='DaysOfWeekHeaders'>
                    <th class='Days'></th>
                    {this.DaysOfWeek.map(x => <th class='Days'>{x}</th>)}
                  </tr>
                </tbody>
              </table></ion-row>
            <div class='scroll'>
              <table class='Schedule'>
                <tbody class='TableBody'>
                  <tr class='TimeSlots'>
                    <td class='Time'><div></div></td>
                    {this.DaysOfWeek.map(() => <td class='box' onMouseDown={(event: any) => this.SelectTime(event)}></td>)}
                  </tr>
                  {
                    this.Hours.map(x => <tr class='TimeSlots'>
                      <td class='Time'><div class='TimeText'>{x}</div></td>
                      {this.DaysOfWeek.map(() => <td class='box' onMouseDown={(event: any) => this.SelectTime(event)}></td>)}
                    </tr>)
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="footer">
          <button class='button save' onClick={() => this.Save()} type="submit">Spara</button>
          <button class='button close' type="submit" value="Submit" onClick={() => { this.close() }}>Avbryt</button>
        </div>
      </div>
    );
  }
}
