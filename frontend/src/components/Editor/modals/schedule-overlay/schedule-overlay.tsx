import { Component, h, State, Element } from '@stencil/core';
import { Z_ASCII } from 'zlib';
import { MenuWithCategory } from '../../../utils/utils';

@Component({
  tag: 'schedule-overlay',
  styleUrl: 'schedule-overlay.css',
  shadow: true,
})
export class ScheduleOverlay {
  @State() menus: MenuWithCategory[]
  @State() locationList;
  @State() daysOfWeek: string[] = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
  @State() hours: string[] = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  @State() selectedMenuId: number;
  @State() selectedLocation
  @State() activeBox: string;
  @Element() element: HTMLElement;
  @State() timeTables?: Timetable[] = [];


  async componentWillLoad() {
    const menu = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component');
    const toolbar = document.querySelector('editor-visual-check').shadowRoot.querySelector('toolbar-component');
    this.menus = await menu?.GetMenu();
    this.locationList = await toolbar?.GetLocations();


    this.timeTables = this.locationList.locations.flatMap(l => {
      return {
        locationId: l.id,
        menus: this.menus.flatMap(x => { return { MenuId: x.menu.id, Days: this.daysOfWeek.map(x => { return { Day: x, Times: [] } }) } })
      }
    })
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  SelectTime(ev) {
    const table = ev.target.parentElement.parentElement;
    if (this.selectedMenuId != null) {
      table.onmousemove = (event: any) => {
        event.preventDefault();

        if (event.target.classList.contains('box')) {
          if (event.target.classList.contains('active')) {
            const allbox = this.element.shadowRoot.querySelectorAll('.box')
            const active = this.element.shadowRoot.querySelectorAll('.active')
            active.forEach(x => {
              allbox.forEach(a => {
                if (x.parentElement.id == a.parentElement.id && event.target.id == x.id || a.id == x.id && event.target.parentElement.id == x.parentElement.id) {
                  console.log('a')
                  x.classList.remove('active')
                  x.classList.add('deselect')
                }
              })
            })
          }
          else if (event.target.classList.contains('select')) {

          }

          else if (!event.target.classList.contains('inactive')) {
            event.target.classList.add('select');
            const selected = this.element.shadowRoot.querySelectorAll('.select')
            const allbox = this.element.shadowRoot.querySelectorAll('.box')

            selected.forEach(x => {
              allbox.forEach(a => {
                if (a.parentElement.id == x.parentElement.id && a.id == event.target.id || a.id == x.id && a.parentElement.id == event.target.parentElement.id) {
                  a.classList.add('select')
                }
              })
            })
          }
        }
      }
      table.onmouseup = () => {
        this.element.shadowRoot.querySelectorAll('.select').forEach(x => {
          x.classList.remove('select');
          x.classList.add('active')
          this.timeTables.find(t => t.locationId == this.selectedLocation.id)
            .menus.find(m => m.MenuId == this.selectedMenuId)
            .Days.find(d => d.Day == x.id)
            .Times.push({ time: x.parentElement.id })
        })
        this.element.shadowRoot.querySelectorAll('.deselect').forEach(x => {
          x.classList.remove('active')
          x.classList.remove('deselect');
          let a = this.timeTables.find(t => t.locationId == this.selectedLocation.id)
            .menus.find(m => m.MenuId == this.selectedMenuId)
            .Days.find(d => d.Day == x.id)
            .Times;
          a.splice(a.indexOf(a.find(c => c.time == x.parentElement.id)));
        })
        table.onmouseup = null;
        table.onmousemove = null;
        // this.select(this.days);
      }
    }
  }

  markUnavailableTimes() {
    this.timeTables?.find(t => t.locationId == this.selectedLocation?.id)
      .menus?.filter(m => m.MenuId != this.selectedMenuId)
      .forEach(s => s.Days?.forEach(d => d.Times?.forEach(time => {
        this.element.shadowRoot.querySelectorAll('.box').forEach(c => {
          if (c.id == d.Day && c.parentElement.id == time.time) {
            c.classList.add('inactive');
            c.classList.remove('active')
          }
        })
      })))
    this.timeTables?.find(t => t.locationId == this.selectedLocation.id)
      .menus?.find(m => m.MenuId == this.selectedMenuId)?.Days?.forEach(d => d.Times.forEach(time => {
        this.element.shadowRoot.querySelectorAll('.box').forEach(c => {
          if (c.id == d.Day && c.parentElement.id == time.time) {
            c.classList.remove('inactive');
            c.classList.add('active');
          }
        })
      }))
  }

  private customPopoverOptions: any = {
    reference: "event",
  };

  Save() {
    // this.timeTables.find(x => x.locationId == 1).menus.find(z => z.MenuId == this.selectedMenuId).Days = days;
  }

  changeLocation() {
    this.element.shadowRoot.querySelectorAll('.box').forEach(x => {
      x.className = 'box'
    })
    this.markUnavailableTimes();
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
                <ion-select value={this.locationList?.selectedLocation?.name} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Plats' onIonChange={(event: any) => { this.selectedLocation = event.target.value, this.changeLocation() }}>
                  {this.locationList?.locations?.map(x => <ion-select-option value={x}>{x.name}</ion-select-option>)}
                </ion-select>
              </ion-item>
              <ion-item class='row'>
                <ion-select value={this.selectedMenuId} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Meny' onIonChange={(event: any) => { this.selectedMenuId = event.target.value, this.markUnavailableTimes() }}>
                  {this.menus.map(x => <ion-select-option value={x.menu.id}>{x.menu.name}</ion-select-option>)}
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
                    {this.daysOfWeek.map(x => <th class='Days'>{x}</th>)}
                  </tr>
                </tbody>
              </table></ion-row>
            <div class='scroll'>
              <table class='Schedule'>
                <tbody class='TableBody' onMouseDown={(event: any) => this.SelectTime(event)}>
                  <tr id='00:00' class='TimeSlots'>
                    <td class='Time'><div></div></td>
                    {this.daysOfWeek.map(d => <td id={d} class='box'></td>)}
                  </tr>
                  {
                    this.hours.map(x => <tr id={x} class='TimeSlots'>
                      <td class='Time'><div class='TimeText'>{x}</div></td>
                      {this.daysOfWeek.map((d) => <td id={d} class='box'></td>)}
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


export interface Timetable {
  locationId: number,
  menus: menu[]

}

export interface days {
  Day: string,
  Times?: times[]
}

export interface times {
  time: string
}

export interface menu {
  MenuId: number
  Days: days[]
}
