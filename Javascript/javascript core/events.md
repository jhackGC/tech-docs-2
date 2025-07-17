## Event propagation
    <li>
    <button class="delete"
        (click)="delete(hero); $event.stopPropagation()">x</button>
    </li>

In addition to calling the component's delete() method, the delete button's click handler code stops the propagation of the click event—you don't want the <li> click handler to be triggered because doing so would select the hero that the user will delete.