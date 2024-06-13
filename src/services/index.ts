//create an index for all services in this folder

import { getLabels, addLabel, removeLabel, getRolesByLabelName } from './labels';
import { getRoles, postUsers, getRole, updateRole, deleteRole, postRoles, getUserById, updateUser, deleteUser } from './users';
import { signIn, signUp, lostPassword, changePassword } from './auth';
import { getJobs, postJobs } from './jobs';
import { getModalities, updateModality, deleteModality, echoModality } from './modalities';
import { getOauth2Config, postOauth2Config, deleteOauth2Config  } from './oauth2';
import { getOptions, updateOptions } from './options';
import { getOrthancSystem,orthancReset,orthancShutdown,updateVerbosity,getVerbosity } from './orthanc';
import { updatePeer,getPeers,echoPeer,deletePeer } from './peers';
import { postQuery } from './query';
export {
    addLabel,
    changePassword,
    deleteModality,
    deleteOauth2Config,
    deletePeer,
    deleteRole,
    deleteUser,
    echoModality,
    echoPeer,
    getLabels,
    getModalities,
    getOauth2Config,
    getOptions,
    getOrthancSystem,
    getPeers,
    getRole,
    getRoles,
    getRolesByLabelName,
    getVerbosity,
    getUserById,
    getJobs,
    lostPassword,
    orthancReset,
    orthancShutdown,
    postJobs,
    postOauth2Config,
    postQuery,
    postRoles,
    postUsers,
    removeLabel,
    signIn,
    signUp,
    updateModality,
    updateOptions,
    updatePeer,
    updateRole,
    updateVerbosity,
};

