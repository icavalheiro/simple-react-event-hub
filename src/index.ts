import { useEffect } from 'react';

class EventHub
{
  private listeners: {};

  constructor ()
  {
    this.listeners = {};
  }

  public addListener ( type: string, listener: ( payload: any ) => {} )
  {
    if ( !this.listeners[ type ] )
    {
      this.listeners[ type ] = [];
    }

    this.listeners[ type ].push( listener );
  }

  public removeListener ( type: string, listener: ( payload: any ) => {} )
  {
    if ( !this.listeners[ type ] )
      return;

    this.listeners[ type ] = this.listeners[ type ].filter( x => x != listener );
  }

  public dispatchEvent ( type: string, payload: any )
  {
    if ( !this.listeners[ type ] )
      return;

    for ( let i = 0; i < this.listeners[ type ].length; i++ )
    {
      this.listeners[ type ][ i ]();
    }
  }

  public useEvent ( type: string, listener: ( payload: any ) => {} )
  {
    useEffect( () =>
    {
      this.addListener( type, listener );

      return () =>
      {
        this.removeListener( type, listener );
      };
    } );
  }
}

const eventHub = new EventHub();

export default eventHub;

export var useEvent = eventHub.useEvent.bind( eventHub );
export var dispatchEvent = eventHub.dispatchEvent.bind( eventHub );