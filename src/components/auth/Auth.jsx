import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import supabaseClient from '../../utils/supabase';

export const RequireAuth = ({children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSession = async () => {
        const { data: { session }, error } = await supabaseClient.auth.getSession();

        if (!error)
        {
            setSession(session);
            setLoading(false);
        }

        //if (error) console.error('Error al recuperar la sesión:', error);
        //else if (session) //console.log('El usuario está autenticado:', session.user);
        // Aquí puedes acceder a session.access_token
        //else //console.log('No hay un usuario autenticado.');

    };

    useEffect(() => {
        fetchSession();
    }, []);

    if (loading) return (
      <section className="LandingContainer h-dvh text-white"></section>
    );

    if (session) {
        return children;
    }
    else
    {
        return <Navigate to="/iniciar-sesión"/>;
    }

};


export const IsAuth = ({children}) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSession = async () => {
        const { data: { session }, error } = await supabaseClient.auth.getSession();

        if (!error)
        {
            setSession(session);
            setLoading(false);
        }
        //if (error) console.error('Error al recuperar la sesión:', error);
        //else if (session) //console.log('El usuario está autenticado:', session.user);
        // Aquí puedes acceder a session.access_token
        //else //console.log('No hay un usuario autenticado.');
 
    };

    useEffect(() => {
        fetchSession();
    }, []);

    if (loading) return (
      <section className="LandingContainer h-dvh text-white"></section>
    );

    if (session) {
        return <Navigate to="/panel"/>;
    }
    else
    {
        return children;
    }
}
