import { Component, h, State, Element } from '@stencil/core';
import { TimeLike } from 'fs';
import { config } from 'process';
import { GetData } from '../../../utils/get';
import { MenuWithCategory, location, mainConfig } from '../../../utils/utils';

@Component({
  tag: 'schedule-overlay',
  styleUrl: 'schedule-overlay.css',
  shadow: true,
})
export class ScheduleOverlay {
  @State() menus: MenuWithCategory[]
  @State() locationList: location[];
  @State() daysOfWeek: [string, number][] = [['Måndag', 1], ['Tisdag', 2], ['Onsdag', 3], ['Torsdag', 4], ['Fredag', 5], ['Lördag', 6], ['Söndag', 0]]
  @State() hours: string[] = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
  @State() selectedMenuId: number;
  @State() selectedLocation: location
  @State() activeBox: string;
  @Element() element: HTMLElement;
  @State() timeTables?: Timetable[] = [];


  async componentWillLoad() {
    this.selectedLocation = mainConfig.selectedLocation

    this.locationList = await GetData('http://localhost:8080/locations');

    const menu = document.querySelector('editor-visual-check').shadowRoot.querySelector('homepage-menu-editor-component').shadowRoot.querySelector('menu-editor-component');
    const toolbar = document.querySelector('editor-visual-check').shadowRoot.querySelector('toolbar-component');
    this.menus = await menu?.GetMenu();
    this.locationList = await toolbar?.GetLocations();

    console.log(mainConfig.selectedLocation.name)
    this.timeTables = this.locationList.flatMap(l => {
      return {
        locationId: l.id,
        menus: this.menus.flatMap(m => { return { MenuId: m.menu.id, Days: this.daysOfWeek.map(d => { return { Day: d[1], Times: [] } }) } })
      }
    })
  }

  async close() {
    await customElements.whenDefined('ion-modal')
    const modal = document.querySelector('ion-modal')
    await modal.dismiss();
  }

  SelectTime(ev) {
    const originalEventTarget = ev.target;
    const table = ev.target.parentElement.parentElement;
    if (this.selectedMenuId != null && originalEventTarget.classList.contains('box')) {
      if (!originalEventTarget.classList.contains('inactive')) {
        if (originalEventTarget.classList.contains('active') || originalEventTarget.classList.contains('deselect')) {
          originalEventTarget.classList.add('deselect')
        }
        else if (!originalEventTarget.classList.contains('active')) {
          originalEventTarget.classList.add('select')
        }
      }

      table.onmousemove = (event: any) => {
        event.preventDefault();
        const newEventTargetRect = event.target.getBoundingClientRect()

        this.element.shadowRoot.querySelectorAll('.box').forEach(box => {
          const boxRect = box.getBoundingClientRect()
          const originalEventTargetRect = originalEventTarget.getBoundingClientRect()

          const bx1 = boxRect.x >= originalEventTargetRect.x
          const bx2 = boxRect.x <= newEventTargetRect.x
          const by1 = boxRect.y >= originalEventTargetRect.y
          const by2 = boxRect.y <= newEventTargetRect.y

          const bx3 = boxRect.x <= originalEventTargetRect.x
          const bx4 = boxRect.x >= newEventTargetRect.x
          const by3 = boxRect.y <= originalEventTargetRect.y
          const by4 = boxRect.y >= newEventTargetRect.y

          if (((bx1 && bx2) || (bx3 && bx4)) && ((by1 && by2) || (by3 && by4))) {
            if (!box.classList.contains('inactive')) {
              if (originalEventTarget.classList.contains('active') || originalEventTarget.classList.contains('deselect')) {
                box.classList.add('deselect')
              }
              else if (!originalEventTarget.classList.contains('active')) {
                box.classList.add('select')
              }
            }
          }
          else {
            box.classList.remove('deselect', 'select')
          }
        })
      }
      window.onmouseup = () => {
        table.onmouseup = null;
        table.onmousemove = null;

        this.timeTables.find(t => t.locationId == mainConfig.selectedLocation.id)
          .menus.find(m => m.MenuId == this.selectedMenuId)
          .Days.forEach(d => d.Times = [])

        this.element.shadowRoot.querySelectorAll('.select').forEach(x => {
          x.classList.remove('select');
          x.classList.add('active')
        })

        this.element.shadowRoot.querySelectorAll('.deselect').forEach(x => {
          x.classList.remove('active')
          x.classList.remove('deselect');
        })

        this.element.shadowRoot.querySelectorAll('.active').forEach(x => {
          const a = this.timeTables?.find(t => t.locationId == mainConfig.selectedLocation.id)
            .menus.find(m => m.MenuId == this.selectedMenuId)
            .Days.find(d => d.Day == Number(x.id))
            .Times
          a.push({ time: x.parentElement.id })
        })
      }
    }
  }

  markUnavailableTimes() {
    this.element.shadowRoot.querySelectorAll('.box').forEach(x => {
      x.className = 'box'
    })
    this.timeTables?.find(t => t.locationId == this.selectedLocation.id)
      .menus?.filter(m => m.MenuId != this.selectedMenuId)
      .forEach(s => s.Days?.forEach(d => d.Times?.forEach(time => {
        this.element.shadowRoot.querySelectorAll('.box').forEach(c => {
          if (Number(c.id) == d.Day && c.parentElement.id == time.time) {
            c.classList.add('inactive');
            c.classList.remove('active')
          }
        })
      })))
    this.timeTables?.find(t => t.locationId == mainConfig.selectedLocation.id)
      .menus?.find(m => m.MenuId == this.selectedMenuId)?.Days?.forEach(d => d.Times.forEach(time => {
        this.element.shadowRoot.querySelectorAll('.box').forEach(c => {
          if (Number(c.id) == d.Day && c.parentElement.id == time.time) {
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

  changeLocation(event: any) {
    this.selectedLocation = event.target.value
    this.markUnavailableTimes();
  }
  changeMenu(event: any) {
    this.selectedMenuId = event.target.value  
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
                <ion-select selectedText={this.selectedLocation.name} value={mainConfig.selectedLocation} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Plats' onIonChange={(event: any) => {this.changeLocation(event) }}>
                  {this.locationList?.map(x => <ion-select-option value={x}>{x.name}</ion-select-option>)}
                </ion-select>
              </ion-item>
              <ion-item class='row'>
                <ion-select value={this.selectedMenuId} interface='popover' interfaceOptions={this.customPopoverOptions} placeholder='Meny' onIonChange={(event: any) => {this.changeMenu(event) }}>
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
                    {this.daysOfWeek.map(x => <th class='Days'>{x[0]}</th>)}
                  </tr>
                </tbody>
              </table></ion-row>
            <div class='scroll'>
              <table class='Schedule'>
                <tbody class='TableBody' onMouseDown={(event: any) => this.SelectTime(event)}>
                  <tr id='00:00' class='TimeSlots'>
                    <td class='Time'><div></div></td>
                    {this.daysOfWeek.map(d => <td id={String(d[1])} class='box'></td>)}
                  </tr>
                  {
                    this.hours.map(x => <tr id={x} class='TimeSlots'>
                      <td class='Time'><div class='TimeText'>{x}</div></td>
                      {this.daysOfWeek.map((d) => <td id={String(d[1])} class='box'></td>)}
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
  Day: number,
  Times?: times[]
}

export interface times {
  time: TimeLike
}

export interface menu {
  MenuId: number
  Days: days[]
}
